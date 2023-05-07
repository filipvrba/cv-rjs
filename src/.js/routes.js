import Route from "./core/route";
const ROUTES = {"/": PAGES.home, "404": PAGES.err_404};
new Route(ROUTES)