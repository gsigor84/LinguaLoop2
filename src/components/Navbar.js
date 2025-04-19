'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: 'home', href: '/' },
    { label: 'lesson', href: '/lesson' },
    { label: 'quiz', href: '/quiz' },
    { label: 'rhyme', href: '/rhyme' },
    { label: 'about us', href: '/about' },
    { label: 'contact us', href: '/contact' },
  ];

  const toggleDrawer = (state) => () => setOpen(state);

  return (
    <nav className="bg-[#272666] px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl tracking-wide" style={{ color: '#ffffff' }}>
          <span className="font-bold font-bold text-white">Lingua</span>
          <span className="font-light font-light text-white">Loop</span>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-base">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ color: '#ffffff' }}
              className="capitalize font-semibold hover:opacity-90 transition"
            >
              {label}
            </Link>
          ))}
        </div>


        {/* Mobile View */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            href="/contact"
            style={{ color: '#ffffff' }}
            className="underline text-sm font-medium capitalize"
          >
            Contact Us
          </Link>
          <IconButton
            onClick={toggleDrawer(true)}
            aria-label="menu"
            sx={{
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <Menu size={28} color="#ffffff" />
          </IconButton>
        </div>
      </div>

      {/* MUI Drawer for Mobile Menu */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#272666',
            color: '#ffffff',
            width: '70%',
            '& .MuiListItemText-root span': {
              color: '#ffffff !important',
              fontSize: '1rem',
            },
          },
        }}
      >
        <List>
          {navLinks.map(({ label, href }) => (
            <ListItem
              button
              key={label}
              component={Link}
              href={href}
              onClick={toggleDrawer(false)}
              sx={{
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#383580',
                },
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{ style: { color: '#ffffff' } }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
}
