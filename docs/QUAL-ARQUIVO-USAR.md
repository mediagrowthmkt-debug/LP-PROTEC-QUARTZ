# 🚀 QUAL ARQUIVO USAR? - Guia Rápido

## 📌 Identifique seu tipo de servidor:

### ✅ Se você usa **APACHE** (cPanel, Hostgator, GoDaddy, etc):
```
Arquivo a usar: .htaccess
Localização: Raiz do site
Status: ✅ JÁ CRIADO
```

### ✅ Se você usa **NETLIFY**:
```
Arquivo a usar: _redirects
Localização: Raiz do site
Status: ✅ JÁ CRIADO
```

### ✅ Se você usa **VERCEL**:
```
Arquivo a usar: vercel.json
Localização: Raiz do site
Status: ✅ JÁ CRIADO
```

### ✅ Se você usa **NGINX**:
```
Arquivo a usar: nginx.conf (configuração manual)
Localização: Servidor
Status: ⚠️ REQUER ACESSO AO SERVIDOR
Ver: SOLUCAO-SLUGS.md
```

### ✅ Se você usa **GitHub Pages**:
```
Solução: Usar URLs com .html
Exemplo: yourwebsite.com/installers.html
Status: ⚠️ Não suporta redirects personalizados
```

---

## 📦 ARQUIVOS NO SEU PROJETO:

```
✅ .htaccess          → Para Apache
✅ _redirects         → Para Netlify
✅ vercel.json        → Para Vercel
✅ installers.html    → Redirect HTML (backup)
✅ installation.html  → Redirect HTML (backup)
✅ kitchen-quartz.html → Redirect HTML (backup)
```

---

## 🎯 INSTRUÇÃO RÁPIDA:

1. **Identifique seu servidor** (Apache, Netlify, Vercel, etc)
2. **Faça upload do arquivo correspondente** para a raiz
3. **Teste as URLs** sem .html
4. **Se não funcionar**, use as URLs com `.html`

---

## 🔍 COMO SABER QUAL SERVIDOR VOCÊ USA?

### Você tem cPanel?
→ Usa **Apache** → Use `.htaccess`

### Você fez deploy via Netlify.com?
→ Usa **Netlify** → Use `_redirects`

### Você fez deploy via Vercel.com?
→ Usa **Vercel** → Use `vercel.json`

### Você usa GitHub Pages?
→ Use URLs com `.html` (installers.html)

### Não sabe?
→ Faça upload de **todos os arquivos** (.htaccess + _redirects + vercel.json)
→ O servidor vai usar o correto automaticamente

---

**Resumo:** Todos os arquivos já estão prontos! Faça upload e teste! 🚀
