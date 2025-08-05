import React, { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  useTheme
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin' && password === 'EDAtesting') {
      setError('')
      onLogin()
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 3,
            boxShadow: theme.shadows[3],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
            <Box
              component="img"
              src="elv_r_rgb_navy.svg"
              alt="logo"
              sx={{ width: 120, height: 120, mb: 1 }}
            />
            {/* <Typography variant="h5" fontWeight={700}>
              Agent UI Template
            </Typography> */}
            <Typography
              component="h1"
              variant="h6"
              fontWeight={600}
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Sign in to your account
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <TextField
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              required
              fullWidth
              autoFocus
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              aria-label="Username"
            />

            <TextField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              fullWidth
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              aria-label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Link href="#" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: '#1a3673',
                color: '#fff',
                boxShadow: theme.shadows[2],
                '&:hover': {
                  backgroundColor: '#162d5c',
                },
              }}
            >
              Sign in
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
