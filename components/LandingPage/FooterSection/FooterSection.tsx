'use client'

import { Group, ActionIcon, Image, rem, Text } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './FooterSection.module.css';
import React from 'react';

export default function FooterSection() {
  return (
    <section className={classes.footer}>
      <div className={classes.inner}>
        <Image
          height={28}
          src="/debate-me-logo.svg"
          alt="Debate.me logo" />
        <Text>©2024 pixelSHREDDER</Text>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </section>
  );
}
