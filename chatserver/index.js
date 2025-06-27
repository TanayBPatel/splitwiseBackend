import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose connection
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to Database');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

// User Schema & Model
const userSchema = new Schema({
  clerkUserId: { type: String, unique: true, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

// Expense Schema & Model
const expenseSchema = new Schema({
  title: String,
  amount: Number,
  description: String,
  paidBy: { type: Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  shareAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

const Expense = model('Expense', expenseSchema);

// Routes
app.get('/api/users/:clerkUserId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkUserId: req.params.clerkUserId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).sort({ name: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { clerkUserId, name } = req.body;
    if (!clerkUserId || !name) return res.status(400).json({ error: 'clerkUserId and name are required' });

    const newUser = await User.create({ clerkUserId, name });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'User already exists' });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find({})
      .populate('paidBy', 'name')
      .sort({ createdAt: -1 });
    const formatted = expenses.map(exp => ({ ...exp.toObject(), paidByName: exp.paidBy.name, id: exp._id }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const { title, amount, description, paidBy, sharedWith } = req.body;
    if (!title || !amount || !paidBy || !sharedWith?.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const shareAmount = amount / sharedWith.length;
    const newExpense = await Expense.create({
      title,
      amount,
      description,
      paidBy,
      sharedWith,
      shareAmount,
    });

    const populated = await Expense.findById(newExpense._id).populate('paidBy', 'name');
    res.status(201).json({ ...populated.toObject(), paidByName: populated.paidBy.name, id: populated._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/settlements', async (req, res) => {
  try {
    const users = await User.find();
    const expenses = await Expense.find();

    const balances = users.map(user => {
      const totalPaid = expenses.filter(e => e.paidBy.toString() === user._id.toString()).reduce((sum, e) => sum + e.amount, 0);
      const totalOwed = expenses.filter(e => e.sharedWith.map(String).includes(user._id.toString())).reduce((sum, e) => sum + e.shareAmount, 0);
      return { id: user._id, name: user.name, balance: totalPaid - totalOwed };
    });

    const debtors = balances.filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);
    const creditors = balances.filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);

    const settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debt = Math.abs(debtors[i].balance);
      const credit = creditors[j].balance;
      const amount = Math.min(debt, credit);

      if (amount > 0.01) {
        settlements.push({ from: debtors[i].name, to: creditors[j].name, amount: amount.toFixed(2) });
      }

      debtors[i].balance += amount;
      creditors[j].balance -= amount;

      if (Math.abs(debtors[i].balance) < 0.01) i++;
      if (Math.abs(creditors[j].balance) < 0.01) j++;
    }

    res.json(settlements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('paidBy', 'name')
      .populate('sharedWith', 'name');

    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    res.json({
      ...expense.toObject(),
      paidByName: expense.paidBy.name,
      sharedWithNames: expense.sharedWith.map(u => u.name),
      id: expense._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    res.json({ status: state === 1 ? 'OK' : 'Error', timestamp: new Date().toISOString(), database: state === 1 ? 'Connected' : 'Disconnected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const startServer = async () => {
  await connectToDB();
  await User.init();
  await Expense.init();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error);
