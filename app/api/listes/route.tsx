import { getDb } from "../../database/bd";
import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";

export async function GET(): Promise<NextResponse> {
  try {
    const db = getDb();
    const listesCollection = collection(db, "listes");
    const snapshot = await getDocs(listesCollection);

    const listes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(listes);
  } catch (error) {
    console.error("Erreur lors de la récupération des listes:", error);
    return NextResponse.json(
      {
        error: "Impossible de charger les listes. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le nom de la liste est requis" },
        { status: 400 }
      );
    }

    // Capitaliser la première lettre
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const db = getDb();
    const listesCollection = collection(db, "listes");

    // Vérifier si l'article existe déjà dans la liste (insensible à la casse)
    const q = query(listesCollection, where("articles", "==", capitalizedName));
    const existingDocs = await getDocs(q);

    if (!existingDocs.empty) {
      return NextResponse.json(
        { error: "Cet article existe déjà dans la liste" },
        { status: 409 }
      );
    }

    const docRef = await addDoc(listesCollection, {
      articles: capitalizedName,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json(
      {
        id: docRef.id,
        articles: capitalizedName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la liste:", error);
    return NextResponse.json(
      { error: "Impossible de créer la liste. Veuillez réessayer plus tard." },
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
        { error: "L'ID de la liste est requis" },
        { status: 400 }
      );
    }

    const db = getDb();
    const docRef = doc(db, "listes", id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Erreur lors de la suppression de la liste:", error);
    return NextResponse.json(
      {
        error: "Impossible de supprimer la liste. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    );
  }
}
