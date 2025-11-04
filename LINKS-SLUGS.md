# 🔗 LINKS E SLUGS - Protec Quartz Landing Pages

## 📊 RESUMO DE TODOS OS LINKS

### Estrutura de URLs:

| Página | Arquivo Original | Slug Amigável | Uso |
|--------|------------------|---------------|-----|
| **Main Page** | `index.html` | `/` | Landing principal |
| **Installers** | `quartz-countertop-installers.html` | `/installers` | Google Ads sitelink |
| **Installation** | `kitchen-countertops-installation.html` | `/installation` | Google Ads sitelink |
| **Kitchen Quartz** | `kitchen-quartz-countertops.html` | `/kitchen-quartz` | Google Ads sitelink |
| **Thank You** | `thank-you.html` | `/thank-you` | Conversão |
| **Links Index** | `links.html` | `/links` | Navegação interna |

---

## 🎯 URLS PARA GOOGLE ADS

### Landing Pages (URLs Principais):

```
1. yourwebsite.com/installers
   → Keyword: [quartz countertop installers]
   → Foco: Instaladores certificados

2. yourwebsite.com/installation
   → Keyword: "kitchen countertops installation"
   → Foco: Processo de instalação

3. yourwebsite.com/kitchen-quartz
   → Keyword: [kitchen quartz countertops]
   → Foco: Quartz para cozinhas
```

### Sitelinks (URLs Secundárias):

```
Sitelink 1: yourwebsite.com/installers
Sitelink 2: yourwebsite.com/installation
Sitelink 3: yourwebsite.com/kitchen-quartz
Sitelink 4: yourwebsite.com/#contact-form
```

---

## 📱 URLS PARA COMPARTILHAR

### Redes Sociais:
```
Facebook/Instagram: yourwebsite.com/installers
LinkedIn: yourwebsite.com/installation
Pinterest: yourwebsite.com/kitchen-quartz
```

### Email Marketing:
```
Email 1 (Instaladores): yourwebsite.com/installers
Email 2 (Processo): yourwebsite.com/installation
Email 3 (Opções): yourwebsite.com/kitchen-quartz
```

### SMS/WhatsApp:
```
yourwebsite.com/installers - Ver instaladores certificados
yourwebsite.com/kitchen-quartz - Ver opções de quartz
```

---

## 🔧 CONFIGURAÇÃO TÉCNICA

### Arquivos de Redirect (Slugs):

Os arquivos `/installers`, `/installation` e `/kitchen-quartz` são redirects HTML que enviam para as páginas completas.

**Como funcionam:**
- Usuário acessa: `yourwebsite.com/installers`
- Redirect instantâneo para: `quartz-countertop-installers.html`
- Google Ads rastreia: `/installers`

### Vantagens:
✅ URLs mais curtas
✅ Fácil de lembrar
✅ Profissional
✅ SEO-friendly
✅ Tracking preciso

---

## 📈 TRACKING NO GOOGLE ADS

### UTM Parameters (Opcional):

```
yourwebsite.com/installers?utm_source=google&utm_medium=cpc&utm_campaign=quartz-installers

yourwebsite.com/installation?utm_source=google&utm_medium=cpc&utm_campaign=kitchen-installation

yourwebsite.com/kitchen-quartz?utm_source=google&utm_medium=cpc&utm_campaign=kitchen-quartz
```

---

## 🎨 DISPLAY URLS NO GOOGLE ADS

### Como Aparecerão nos Anúncios:

**Anúncio 1:**
```
yourwebsite.com/installers
Certified Quartz Countertop Installers
Expert installation with 7-day guarantee
```

**Anúncio 2:**
```
yourwebsite.com/installation
Professional Kitchen Installation
From template to install in 7 days
```

**Anúncio 3:**
```
yourwebsite.com/kitchen-quartz
Premium Kitchen Quartz Countertops
100+ stain-proof options available
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Passo 1: Upload dos Arquivos
- [ ] Upload `index.html` para raiz
- [ ] Upload `quartz-countertop-installers.html` para raiz
- [ ] Upload `kitchen-countertops-installation.html` para raiz
- [ ] Upload `kitchen-quartz-countertops.html` para raiz
- [ ] Upload `thank-you.html` para raiz
- [ ] Upload arquivo `installers` (sem extensão) para raiz
- [ ] Upload arquivo `installation` (sem extensão) para raiz
- [ ] Upload arquivo `kitchen-quartz` (sem extensão) para raiz

### Passo 2: Testar os Redirects
- [ ] Acessar `yourwebsite.com/installers` → deve redirecionar
- [ ] Acessar `yourwebsite.com/installation` → deve redirecionar
- [ ] Acessar `yourwebsite.com/kitchen-quartz` → deve redirecionar

### Passo 3: Configurar Google Ads
- [ ] Adicionar `/installers` como landing page
- [ ] Adicionar `/installation` como landing page
- [ ] Adicionar `/kitchen-quartz` como landing page
- [ ] Configurar sitelinks com slugs amigáveis

### Passo 4: Verificar Tracking
- [ ] Tag do Google Ads aparecendo (AW-17704480410)
- [ ] Conversão sendo rastreada em /thank-you
- [ ] Formulários enviando para webhook

---

## 🌐 CONFIGURAÇÃO NO SERVIDOR

### Apache (.htaccess):
```apache
# Se usar Apache, adicione isto ao .htaccess:
RewriteEngine On
RewriteRule ^installers$ quartz-countertop-installers.html [L]
RewriteRule ^installation$ kitchen-countertops-installation.html [L]
RewriteRule ^kitchen-quartz$ kitchen-quartz-countertops.html [L]
RewriteRule ^thank-you$ thank-you.html [L]
```

### Nginx (nginx.conf):
```nginx
# Se usar Nginx, adicione isto:
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

### GitHub Pages / Netlify / Vercel:
Os arquivos de redirect HTML funcionam automaticamente. Nenhuma configuração adicional necessária.

---

## 🚀 URLS FINAIS PARA GOOGLE ADS

```
CAMPANHA: Quartz Countertop Installers

ANÚNCIO 1: yourwebsite.com/installers
ANÚNCIO 2: yourwebsite.com/installation
ANÚNCIO 3: yourwebsite.com/kitchen-quartz

SITELINK 1: yourwebsite.com/installers
SITELINK 2: yourwebsite.com/installation
SITELINK 3: yourwebsite.com/kitchen-quartz
SITELINK 4: yourwebsite.com/#contact-form
```

---

## 📞 SUPORTE

Se precisar alterar os slugs:
1. Renomeie os arquivos de redirect (`installers`, `installation`, etc)
2. Atualize os links no Google Ads
3. Teste todos os redirects

---

**Última Atualização:** 4 de Novembro de 2025  
**Desenvolvido por:** Bruno  
**Cliente:** Protec Premium Granite
