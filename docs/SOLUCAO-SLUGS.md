# ⚠️ SOLUÇÃO PARA SLUGS - Protec Quartz

## 🔴 PROBLEMA IDENTIFICADO

Os arquivos de redirect **sem extensão .html** não funcionam em servidores web comuns porque:
- O servidor não sabe como interpretar arquivos sem extensão
- Mostra o código HTML como texto plano

---

## ✅ SOLUÇÃO IMPLEMENTADA

Criei um arquivo **`.htaccess`** que faz o redirect no lado do servidor.

### O que é o .htaccess?

É um arquivo de configuração do Apache que permite criar URLs amigáveis sem precisar de arquivos físicos.

---

## 📋 INSTRUÇÕES DE INSTALAÇÃO

### Passo 1: Upload dos Arquivos Principais
```
✅ index.html
✅ quartz-countertop-installers.html
✅ kitchen-countertops-installation.html
✅ kitchen-quartz-countertops.html
✅ thank-you.html
✅ style.css
✅ script.js
```

### Passo 2: Upload do .htaccess (CRUCIAL!)
```
✅ .htaccess (na raiz do site)
```

**IMPORTANTE:** O arquivo `.htaccess` deve estar na **raiz** do seu site, junto com o `index.html`.

### Passo 3: Deletar os arquivos antigos (se existirem)
```
❌ installers (sem extensão)
❌ installation (sem extensão)
❌ kitchen-quartz (sem extensão)
```

Ou use as versões com `.html`:
```
✅ installers.html
✅ installation.html
✅ kitchen-quartz.html
```

---

## 🧪 COMO TESTAR

Depois de fazer upload do `.htaccess`, teste estas URLs:

```
1. yourwebsite.com/installers
   → Deve carregar: quartz-countertop-installers.html

2. yourwebsite.com/installation
   → Deve carregar: kitchen-countertops-installation.html

3. yourwebsite.com/kitchen-quartz
   → Deve carregar: kitchen-quartz-countertops.html
```

**Se funcionar:** Página carrega normalmente (sem mostrar código)  
**Se não funcionar:** Veja as alternativas abaixo ⬇️

---

## 🔧 ALTERNATIVAS POR PLATAFORMA

### Se seu servidor NÃO suporta .htaccess:

#### 1️⃣ **Netlify**
Crie um arquivo `_redirects` na raiz:
```
/installers  /quartz-countertop-installers.html  200
/installation  /kitchen-countertops-installation.html  200
/kitchen-quartz  /kitchen-quartz-countertops.html  200
/thank-you  /thank-you.html  200
```

#### 2️⃣ **Vercel**
Crie um arquivo `vercel.json` na raiz:
```json
{
  "rewrites": [
    { "source": "/installers", "destination": "/quartz-countertop-installers.html" },
    { "source": "/installation", "destination": "/kitchen-countertops-installation.html" },
    { "source": "/kitchen-quartz", "destination": "/kitchen-quartz-countertops.html" },
    { "source": "/thank-you", "destination": "/thank-you.html" }
  ]
}
```

#### 3️⃣ **Nginx**
Adicione ao `nginx.conf`:
```nginx
location /installers {
    rewrite ^/installers$ /quartz-countertop-installers.html last;
}
location /installation {
    rewrite ^/installation$ /kitchen-countertops-installation.html last;
}
location /kitchen-quartz {
    rewrite ^/kitchen-quartz$ /kitchen-quartz-countertops.html last;
}
```

#### 4️⃣ **Hospedagem Compartilhada (cPanel/Plesk)**
Use o `.htaccess` fornecido. Funciona em 99% das hospedagens.

#### 5️⃣ **GitHub Pages**
Infelizmente, GitHub Pages **não suporta** redirects personalizados.  
**Solução:** Use as URLs completas com `.html`:
```
yourwebsite.com/installers.html
yourwebsite.com/installation.html
yourwebsite.com/kitchen-quartz.html
```

---

## 🎯 PARA GOOGLE ADS

### Se .htaccess funcionar:
```
Anúncio 1: yourwebsite.com/installers
Anúncio 2: yourwebsite.com/installation
Anúncio 3: yourwebsite.com/kitchen-quartz
```

### Se precisar usar .html:
```
Anúncio 1: yourwebsite.com/installers.html
Anúncio 2: yourwebsite.com/installation.html
Anúncio 3: yourwebsite.com/kitchen-quartz.html
```

**Ambos funcionam no Google Ads!** URLs com `.html` ainda são profissionais e curtas.

---

## 🚨 TROUBLESHOOTING

### Problema: "404 Not Found"
**Causa:** .htaccess não está funcionando  
**Solução:** Verifique se o módulo `mod_rewrite` está ativo no servidor

### Problema: "500 Internal Server Error"
**Causa:** Erro de sintaxe no .htaccess  
**Solução:** Remova o .htaccess e use URLs com .html

### Problema: Ainda mostra código HTML
**Causa:** Servidor não suporta .htaccess  
**Solução:** Use uma das alternativas acima (Netlify/_redirects, etc)

---

## ✅ CHECKLIST FINAL

```
[ ] Upload .htaccess para raiz do site
[ ] Upload todos os arquivos .html
[ ] Testar yourwebsite.com/installers
[ ] Testar yourwebsite.com/installation
[ ] Testar yourwebsite.com/kitchen-quartz
[ ] Atualizar Google Ads com as URLs corretas
[ ] Verificar tracking do Google Ads
```

---

## 📞 RESUMO RÁPIDO

**Melhor solução:** Usar `.htaccess` (funciona em Apache)  
**Arquivo criado:** `.htaccess` na raiz do projeto  
**URLs finais:** `yourwebsite.com/installers` (sem .html)  
**Backup:** Se não funcionar, use `yourwebsite.com/installers.html`

---

**Última Atualização:** 4 de Novembro de 2025  
**Desenvolvido por:** Bruno  
**Cliente:** Protec Premium Granite
