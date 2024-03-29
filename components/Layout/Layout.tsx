import { Container } from '@mantine/core';
import React from 'react';
import classes from './Layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <Container className={classes.layout}>{children}</Container>;
}
