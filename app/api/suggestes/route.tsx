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
  query,
  where,
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

    // Trier par ordre alphabétique sur le champ newSuggestions
    suggests.sort((a, b) => {
      const nameA = (a.newSuggestions || "").toLowerCase();
      const nameB = (b.newSuggestions || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });

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

    // Capitaliser la première lettre
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const db = getDb();
    const suggestsCollection = collection(db, "suggests");

    // Vérifier si la suggestion existe déjà (insensible à la casse)
    const q = query(
      suggestsCollection,
      where("newSuggestions", "==", capitalizedName)
    );
    const existingDocs = await getDocs(q);

    if (!existingDocs.empty) {
      return NextResponse.json(
        { error: "Cette suggestion existe déjà dans la base de données" },
        { status: 409 }
      );
    }

    const docRef = await addDoc(suggestsCollection, {
      newSuggestions: capitalizedName,
      quantity: quantity || 1,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json(
      {
        id: docRef.id,
        newSuggestions: capitalizedName,
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

    // Capitaliser la première lettre
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const db = getDb();

    // Vérifier si une autre suggestion avec le même nom existe déjà
    const suggestsCollection = collection(db, "suggests");
    const q = query(
      suggestsCollection,
      where("newSuggestions", "==", capitalizedName)
    );
    const existingDocs = await getDocs(q);

    // Si un document existe avec le même nom mais un ID différent, c'est un doublon
    const duplicate = existingDocs.docs.find((doc) => doc.id !== id);
    if (duplicate) {
      return NextResponse.json(
        { error: "Cette suggestion existe déjà dans la base de données" },
        { status: 409 }
      );
    }

    const docRef = doc(db, "suggests", id);

    await updateDoc(docRef, {
      newSuggestions: capitalizedName,
      quantity: quantity || 1,
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      id,
      newSuggestions: capitalizedName,
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
