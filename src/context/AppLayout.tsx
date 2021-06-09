import { useRouter } from "next/router";
import LayoutForPath, { LayoutSpec } from "@guyathomas/layout-for-path";

import Header from "components/Header";
import { Container } from "@material-ui/core";

const MainLayout: React.FC = ({ children }) => (
  <>
    <Header />
    <Container>
      {children}
    </Container>
  </>
);

const layoutSpec: LayoutSpec[] = [
  {
    pattern: "/*",
    layout: MainLayout,
  },
];

const AppLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const [pathWithoutQuery] = router.asPath.split("?");
  return (
    <LayoutForPath path={pathWithoutQuery} layoutSpec={layoutSpec}>
      {children}
    </LayoutForPath>
  );
};

export default AppLayout;
