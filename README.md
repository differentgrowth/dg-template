# DG template Website

### Tech Stack

1. NextJS
2. PayloadCMS
3. TailwindCSS
4. ui.shadcn, base-ui, reui.io
5. Docker & PostgreSQL in development environment
6. Vercel Database in production
7. Vercel Blob Storage

---

### Generating PAYLOAD_SECRET and PREVIEW_SECRET

```
openssl rand -base64 32
```

---

### Generating a postgress docker container

```
docker run --name dg-template-postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```

```
DATABASE_URI="postgresql://postgres:<password>@localhost:5432"
```
