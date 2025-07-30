import type { User } from '@/payload-types';

import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

import configPromise from '@payload-config';

import { seedUsers } from '@/lib/seed-data';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      {
        success: false,
        message:
          'Seeding is not allowed in production environment for security reasons.',
      },
      { status: 403 }
    );
  }

  const payload = await getPayload({ config: configPromise });
  const createdUsers: Promise<User>[] = [];

  try {
    const existingUsers = await payload.find({
      collection: 'users',
      depth: 0,
      limit: -1,
      pagination: false,
      select: {
        name: true,
      },
    });
    const existingNames = new Set(existingUsers.docs.map((doc) => doc.name));

    for (const user of seedUsers) {
      if (!existingNames.has(user.name)) {
        const newUser = payload.create({
          collection: 'users',
          data: {
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role as 'admin' | 'editor' | 'user',
          },
        });

        createdUsers.push(newUser);
      }
    }

    await Promise.all(createdUsers);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      users: {
        created: createdUsers.length,
        data: createdUsers,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to seed database',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
