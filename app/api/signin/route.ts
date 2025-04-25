import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs'; // Assuming bcryptjs is used for password hashing

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    console.log('Sign-in: Received email:', email); // Log received email
    console.log('Sign-in: Received password:', password); // Log received password

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Sign-in: User not found'); // Log if user not found
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Sign-in: User found:', user); // Log user object
    console.log('Sign-in: Stored hashed password:', user.password); // Log stored hashed password

    // Compare the provided password with the stored hashed password
    // Assuming the User model has a method or you use a library like bcrypt
    const isMatch = await bcrypt.compare(password, user.password); // Assuming 'password' field exists on User model

    console.log('Sign-in: Password match result:', isMatch); // Log bcrypt.compare result

    if (!isMatch) {
      console.log('Sign-in: Password mismatch'); // Log if password mismatch
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Successful sign-in
    // In a real application, you would typically create a session or JWT here
    return NextResponse.json({ message: 'Sign-in successful', user: { id: user._id, email: user.email } }, { status: 200 });

  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ error: 'An error occurred during sign-in' }, { status: 500 });
  }
}
