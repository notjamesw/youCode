import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebase-config'; // make sure path is correct
import { doc, getDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const docRef = doc(db, 'bios', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Bio not found' }, { status: 404 });
    }

    return NextResponse.json({ bio: docSnap.data() }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bio:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}