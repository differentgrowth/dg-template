// biome-ignore lint/suspicious/useAwait: nextjs convention
export async function GET() {
  const content = `
    # Different Growth

    > Different Growth es una agencia de desarrollo web que ofrece soluciones digitales para potenciar negocios. Nos especializamos en diseño web a medida, SEO y estrategias de marketing digital para ayudar a pequeñas y medianas empresas a alcanzar su máximo potencial online.

    Ofrecemos una gama de servicios que incluyen diseño web profesional, optimización para motores de búsqueda (SEO), y estrategias de marketing digital personalizadas para diversos sectores. Nuestro objetivo es mejorar la visibilidad online de nuestros clientes, atraer tráfico de calidad y convertir visitantes en clientes fieles.

    ## Servicios Principales

    - [Diseño Web para Empresas](/diseno-web): Soluciones de diseño y desarrollo web a medida, enfocadas en la conversión y la experiencia de usuario.
    - [Consultor SEO](/consultor-seo): Estrategias de posicionamiento en buscadores para mejorar la visibilidad en Google y atraer más clientes.
    - [Webs para Clínicas de Fisioterapia](/web-clinicas-fisioterapia): Desarrollo web especializado para fisioterapeutas, con optimización SEO y sistema de reservas.
    - [Diseño Web para Dentistas](/diseno-web-dentistas): Potenciamos clínicas dentales con un diseño web atractivo y profesional.
    - [SEO para Clínicas Dentales](/seo-para-dentistas): Mejoramos la visibilidad online para atraer más pacientes a clínicas dentales.
    - [Publicidad para Clínicas Dentales](/publicidad-para-dentistas): Campañas de publicidad especializadas para aumentar la captación de pacientes.
    - [Webs para Gimnasios y Estudios de Yoga](/gimnasios-fitness-yoga): Creamos sitios web para gimnasios y estudios de yoga que construyen comunidades y atraen miembros.

    ## Empresa

    - [Blog](/blog): Artículos y noticias con recomendaciones para potenciar proyectos online.
    - [Programa de Afiliados](/afiliados): Únete a nuestro programa para ganar comisiones por referir proyectos.
    - [Contacto](/contacto): Ponte en contacto con nosotros para empezar tu proyecto.
  `;

  const headers = new Headers({
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });

  return new Response(content, {
    headers,
  });
}
