type StaticPageQuery = {
	pageName: "index" | "about" | "contact";
};

type BlogPostQuery = {
	type: "blog-post";
	slug: string;
};

export type DynamicPageQuery = StaticPageQuery | BlogPostQuery;
