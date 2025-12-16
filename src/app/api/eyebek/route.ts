import UserCompanyModel from "@/database/models/Company/users";
import CompanyModel from "@/database/models/Eyebek/company";
import { connectTenantDB } from "@/lib/multiTenant";
import { User } from "lucide-react";

export async function POST(req: Request) {
  const { name, phone,  } = await req.json();

  const slug = name.toLowerCase().replace(/\s+/g, "");
  const dbName = `company_${slug}`;
  await CompanyModel.create({
    name,
    phone: "",
    email: "",
    address: "",
    password: "",
    plan_id: null,
    plan_start: null,
    plan_end: null,
    status: true,
    current_users: 0,
    slug,
    dbName,
  });

  // 2️⃣ Crear la DB (Mongo la crea al primer insert)
  const conn = await connectTenantDB(dbName);

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserCompanyModel.create({
    email,
    password: "",
    role: "admin",
  })

  return Response.json({ ok: true });
}
