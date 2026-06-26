(function () {
  var schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "QuikoYA",
      "url": "https://quikoya.com",
      "logo": "https://quikoya.com/assets/logo.png",
      "description": "Plataforma de pedidos locales. Conecta clientes con proveedores cercanos en tiempo real.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hola@quikoya.com",
        "contactType": "customer support"
      },
      "sameAs": []
    },
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      "name": "QuikoYA",
      "description": "Haz tu pedido y los proveedores más cercanos lo reciben al instante. Conecta clientes con proveedores locales sin llamadas ni búsquedas.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "ANDROID",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "url": "https://quikoya.com",
      "image": "https://quikoya.com/assets/logo.png",
      "featureList": [
        "Seguimiento GPS en tiempo real",
        "Chat integrado con el proveedor",
        "Sistema de calificaciones mutuo",
        "Notificaciones push",
        "Historial de pedidos",
        "Adjuntar fotos a la solicitud"
      ]
    }
  ];

  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.text = JSON.stringify(schema);
  document.head.appendChild(el);
})();
