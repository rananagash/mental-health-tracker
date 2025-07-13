import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BarChartIcon from '@mui/icons-material/BarChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/journal');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#f5f6fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          minWidth: 500,
          maxWidth: 700,
          width: '80vw',
          mx: 'auto',
          borderRadius: 4,
          boxShadow: 6
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}>
            Login
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <Button onClick={() => navigate('/signup')}>Sign up</Button>
        </Typography>
      </Paper>
    </Box>
  );
}

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/auth/signup', { email, password, name });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/journal');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#f5f6fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          minWidth: 500,
          maxWidth: 700,
          width: '80vw',
          mx: 'auto',
          borderRadius: 4,
          boxShadow: 6
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}>
            Sign Up
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <Button onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Paper>
    </Box>
  );
}

function AuthenticatedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

const drawerWidth = 260;

function LandscapeLayout({ children, onLogout, navigate }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'primary.main', color: 'white' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            <ListItem button onClick={() => navigate('/journal')}>
              <ListItemIcon sx={{ color: 'white' }}><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate('/mood-trends')}>
              <ListItemIcon sx={{ color: 'white' }}><BarChartIcon /></ListItemIcon>
              <ListItemText primary="Mood Trends" />
            </ListItem>
            <ListItem button onClick={onLogout}>
              <ListItemIcon sx={{ color: 'white' }}><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        {children}
      </Box>
    </Box>
  );
}

function JournalDashboard() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [mood, setMood] = useState(3);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editMood, setEditMood] = useState(3);
  const [prompt, setPrompt] = useState('');
  const [promptLoading, setPromptLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Fetch entries on mount
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/journal');
        setEntries(res.data);
      } catch (err) {
        setError('Failed to load entries');
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // Handle new entry submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/journal', {
        text,
        mood,
        date: new Date(),
      });
      setEntries([res.data, ...entries]);
      setText('');
      setMood(3);
    } catch (err) {
      setError('Failed to save entry');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await api.delete(`/api/journal/${id}`);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (err) {
      setError('Failed to delete entry');
    }
  };

  // Handle start edit
  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditText(entry.text);
    setEditMood(entry.mood);
  };

  // Handle save edit
  const handleSaveEdit = async (id) => {
    try {
      const res = await api.put(`/api/journal/${id}`, {
        text: editText,
        mood: editMood,
      });
      setEntries(entries.map(entry => entry._id === id ? res.data : entry));
      setEditingId(null);
    } catch (err) {
      setError('Failed to update entry');
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleGeneratePrompt = async () => {
    setPromptLoading(true);
    setPrompt('');
    try {
      // OpenAI does not have a truly free public endpoint, so for demo, use a placeholder or a free prompt API if available
      // Example using Bored API for demo purposes
      const res = await fetch('https://www.boredapi.com/api/activity?type=education');
      const data = await res.json();
      setPrompt(data.activity || 'Write about a recent challenge you overcame.');
    } catch (err) {
      setPrompt('Write about a recent challenge you overcame.');
    } finally {
      setPromptLoading(false);
    }
  };

  return (
    <LandscapeLayout
      onLogout={handleLogout}
      navigate={navigate}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button variant="contained" color="info" startIcon={<LightbulbIcon />} onClick={handleGeneratePrompt} disabled={promptLoading}>
                {promptLoading ? 'Generating...' : 'Generate Prompt'}
              </Button>
            </Box>
            {prompt && <Alert icon={<LightbulbIcon fontSize="inherit" />} severity="info" sx={{ mb: 2 }}>{prompt}</Alert>}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>New Journal Entry</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Write about your day..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Mood</InputLabel>
                  <Select
                    value={mood}
                    label="Mood"
                    onChange={e => setMood(Number(e.target.value))}
                  >
                    <MenuItem value={1}>😞 1</MenuItem>
                    <MenuItem value={2}>😐 2</MenuItem>
                    <MenuItem value={3}>🙂 3</MenuItem>
                    <MenuItem value={4}>😄 4</MenuItem>
                    <MenuItem value={5}>😁 5</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mt: 2 }}>
                  Save Entry
                </Button>
              </form>
            </Paper>
            <Typography variant="h6" gutterBottom>Past Entries</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box> : (
              entries.length === 0 ? <Alert severity="info">No entries yet.</Alert> : (
                entries.map(entry => (
                  <Card key={entry._id} sx={{ mb: 2 }}>
                    <CardContent>
                      {editingId === entry._id ? (
                        <>
                          <TextField
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
                            margin="normal"
                          />
                          <FormControl fullWidth margin="normal">
                            <InputLabel>Mood</InputLabel>
                            <Select
                              value={editMood}
                              label="Mood"
                              onChange={e => setEditMood(Number(e.target.value))}
                            >
                              <MenuItem value={1}>😞 1</MenuItem>
                              <MenuItem value={2}>😐 2</MenuItem>
                              <MenuItem value={3}>🙂 3</MenuItem>
                              <MenuItem value={4}>😄 4</MenuItem>
                              <MenuItem value={5}>😁 5</MenuItem>
                            </Select>
                          </FormControl>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button variant="contained" color="success" onClick={() => handleSaveEdit(entry._id)}>Save</Button>
                            <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Typography variant="body1" sx={{ mb: 1 }}>{entry.text}</Typography>
                          <Typography variant="body2" color="text.secondary">Mood: {entry.mood}</Typography>
                          <Typography variant="caption" color="text.secondary">{new Date(entry.date || entry.createdAt).toLocaleDateString()}</Typography>
                          <Divider sx={{ my: 1 }} />
                          <CardActions>
                            <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(entry)}>Edit</Button>
                            <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(entry._id)}>Delete</Button>
                            <Button size="small" onClick={() => navigate(`/journal/${entry._id}`)}>View</Button>
                          </CardActions>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))
              )
            )}
          </Grid>
          <Grid item xs={5}>
            <MoodTrendsPreview />
          </Grid>
        </Grid>
      </Container>
    </LandscapeLayout>
  );
}

function MoodTrendsPreview() {
  // ... reuse MoodTrendsPage logic but with a smaller chart and no AppBar ...
  // For brevity, you can show a small chart or summary here, or leave as a placeholder
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Mood Trends Preview</Typography>
      <Typography variant="body2" color="text.secondary">See your mood chart and stats on the full Mood Trends page.</Typography>
    </Paper>
  );
}

function NewEntryPage() {
  return <h2>New Entry Form</h2>;
}

function EntryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editText, setEditText] = useState('');
  const [editMood, setEditMood] = useState(3);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/journal/${id}`);
        setEntry(res.data);
        setEditText(res.data.text);
        setEditMood(res.data.mood);
      } catch (err) {
        setError('Failed to load entry');
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await api.put(`/api/journal/${id}`, {
        text: editText,
        mood: editMood,
      });
      setEntry(res.data);
      setEditing(false);
    } catch (err) {
      setError('Failed to update entry');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;
  if (!entry) return <p>Entry not found.</p>;

  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/journal')}><ArrowBackIcon /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Entry Details</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box> : error ? <Alert severity="error">{error}</Alert> : !entry ? <Alert severity="warning">Entry not found.</Alert> : (
            editing ? (
              <>
                <TextField
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Mood</InputLabel>
                  <Select
                    value={editMood}
                    label="Mood"
                    onChange={e => setEditMood(Number(e.target.value))}
                  >
                    <MenuItem value={1}>😞 1</MenuItem>
                    <MenuItem value={2}>😐 2</MenuItem>
                    <MenuItem value={3}>🙂 3</MenuItem>
                    <MenuItem value={4}>😄 4</MenuItem>
                    <MenuItem value={5}>😁 5</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
                  <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>{entry.text}</Typography>
                <Typography variant="body2" color="text.secondary">Mood: {entry.mood}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(entry.date || entry.createdAt).toLocaleDateString()}</Typography>
                <Divider sx={{ my: 2 }} />
                <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditing(true)}>Edit</Button>
              </>
            )
          )}
        </Paper>
      </Container>
    </Box>
  );
}

function MoodTrendsPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/journal');
        setEntries(res.data);
      } catch (err) {
        setError('Failed to load entries');
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // Prepare data for chart
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt));
  const labels = sortedEntries.map(e => new Date(e.date || e.createdAt).toLocaleDateString());
  const moodData = sortedEntries.map(e => e.mood);

  // Calculate weekly/monthly averages
  function getAverage(entries) {
    if (!entries.length) return null;
    return (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(2);
  }
  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
  const monthAgo = new Date(now); monthAgo.setMonth(now.getMonth() - 1);
  const weeklyEntries = sortedEntries.filter(e => new Date(e.date || e.createdAt) >= weekAgo);
  const monthlyEntries = sortedEntries.filter(e => new Date(e.date || e.createdAt) >= monthAgo);
  const weeklyAvg = getAverage(weeklyEntries);
  const monthlyAvg = getAverage(monthlyEntries);

  // Summary message
  let summary = '';
  if (weeklyAvg && monthlyAvg) {
    if (weeklyAvg > monthlyAvg) summary = "You've been feeling better this week!";
    else if (weeklyAvg < monthlyAvg) summary = "This week has been a bit tougher. Hang in there!";
    else summary = "Your mood is steady compared to last month.";
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Mood Over Time' },
    },
    scales: {
      y: { min: 1, max: 5, ticks: { stepSize: 1 } },
    },
  };

  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/journal')}><ArrowBackIcon /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Mood Trends</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box> : error ? <Alert severity="error">{error}</Alert> : (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Line data={data} options={options} />
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1"><b>Weekly Average:</b> {weeklyAvg ?? 'N/A'}</Typography>
              <Typography variant="body1"><b>Monthly Average:</b> {monthlyAvg ?? 'N/A'}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>{summary}</Typography>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/journal" element={<AuthenticatedRoute><JournalDashboard /></AuthenticatedRoute>} />
        <Route path="/journal/new" element={<AuthenticatedRoute><NewEntryPage /></AuthenticatedRoute>} />
        <Route path="/journal/:id" element={<AuthenticatedRoute><EntryDetailsPage /></AuthenticatedRoute>} />
        <Route path="/mood-trends" element={<AuthenticatedRoute><MoodTrendsPage /></AuthenticatedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
