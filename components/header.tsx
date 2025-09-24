import { Navbar } from "@/components/navbar";
import { getBlogPage } from "@/queries/get-blog-page";
import { getNavigation } from "@/queries/get-navigation";

export const Header = async () => {
  const [{ docs: pages }, blogPage] = await Promise.all([
    getNavigation({ header: true, footer: false }),
    getBlogPage(),
  ]);

  const items = [
    ...pages.map((item) => ({ ...item, href: `/${item.slug}` })),
    ...(blogPage?.showOnHeader ? [{ ...blogPage, href: "/blog" }] : []),
  ];

  return <Navbar items={items} />;
};
