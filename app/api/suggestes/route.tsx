import { getDb } from "../../database/bd";
import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export async function GET(): Promise<NextResponse> {
  try {
    const db = getDb();
    const suggestsCollection = collection(db, "suggests");
    const snapshot = await getDocs(suggestsCollection);

    const suggests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(suggests);
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions:", error);
    return NextResponse.json(
      {
        error:
          "Impossible de charger les suggestions. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, quantity } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le nom de la suggestion est requis" },
        { status: 400 }
      );
    }

    const db = getDb();
    const suggestsCollection = collection(db, "suggests");

    const docRef = await addDoc(suggestsCollection, {
      newSuggestions: name,
      quantity: quantity || 1,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json(
      {
        id: docRef.id,
        newSuggestions: name,
        quantity: quantity || 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la suggestion:", error);
    return NextResponse.json(
      {
        error:
          "Impossible de créer la suggestion. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id, name, quantity } = body;

    if (!id) {
      return NextResponse.json(
        { error: "L'ID de la suggestion est requis" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le nom de la suggestion est requis" },
        { status: 400 }
      );
    }

    const db = getDb();
    const docRef = doc(db, "suggests", id);

    await updateDoc(docRef, {
      newSuggestions: name,
      quantity: quantity || 1,
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      id,
      newSuggestions: name,
      quantity: quantity || 1,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la suggestion:", error);
    return NextResponse.json(
      {
        error:
          "Impossible de mettre à jour la suggestion. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "L'ID de la suggestion est requis" },
        { status: 400 }
      );
    }

    const db = getDb();
    const docRef = doc(db, "suggests", id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Erreur lors de la suppression de la suggestion:", error);
    return NextResponse.json(
      {
        error:
          "Impossible de supprimer la suggestion. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}
