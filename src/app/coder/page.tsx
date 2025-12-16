
import CoderModel from "@/database/models/coder";
import { dbConnection } from "@/lib/dbConnection";

export async function GET(req, context) {
  const params = await context.params;   // ✔ obligatorio

  await dbConnection();

  const user = await CoderModel.findById(params.id);

  if (!user) {
    return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return Response.json({
    photo: user.photo,
  });
}
