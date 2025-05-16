'use client';

import { useState } from "react";
import Link from "next/link";
import { PrismicImage } from "@prismicio/react";

export default function ProjectList({ projects }: { projects: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(
    projects.map((p) => (p.data.category?.uid ?? "uncategorized"))
  ));

  const filteredProjects = selectedCategory
    ? projects.filter((p) => (p.data.category?.uid === selectedCategory))
    : projects;

  return (
    <div className="archief-wrapper">
      <div className="filter-buttons">
        <div onClick={() => setSelectedCategory(null)} className={selectedCategory === null ? "active" : ""}>Alles</div>
        {categories.map((cat) => (
          <div key={cat} onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? "active" : ""}>
            {cat}
          </div>
        ))}
      </div>
      
      <div className="projects-list">
        {filteredProjects.map((item, i) => (
          <div key={`project${i}`} className={`project project-link ${(item.data.category?.uid ?? "")}`}>
            <Link href={`/projects/${item.uid}`}>
              <h3>{item.data.title}</h3>
              <div className="image-container">
                <PrismicImage field={item.data.image} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
