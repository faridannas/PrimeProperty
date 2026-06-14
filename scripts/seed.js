const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@libsql/client');
const { PrismaLibSQL } = require('@prisma/adapter-libsql');
const bcrypt = require('bcryptjs');

const libsql = createClient({
  url: 'file:dev.db',
});
const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Memulai proses seeding database...');

  const superAdminEmail = 'superadmin@primeproperty.com';
  
  // Cek apakah superadmin sudah ada
  const existingUser = await prisma.user.findUnique({
    where: { email: superAdminEmail }
  });

  if (existingUser) {
    console.log('✅ Superadmin sudah ada. Melewati proses pembuatan.');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash('PrimeAdmin123!', 10);

  // Buat Superadmin pertama (AC-5.1)
  const superadmin = await prisma.user.create({
    data: {
      email: superAdminEmail,
      password: hashedPassword,
      role: 'SUPERADMIN',
      isActive: true,
    }
  });

  console.log('✅ Berhasil membuat akun Superadmin!');
  console.log('-----------------------------------');
  console.log(`Email    : ${superadmin.email}`);
  console.log(`Password : PrimeAdmin123!`);
  console.log('-----------------------------------');
  console.log('Silakan login menggunakan kredensial di atas.');
}

main()
  .catch((e) => {
    console.error('❌ Gagal melakukan seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
