import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

const cardVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function ArticleCard({ article }) {
  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all",
        "hover:shadow-lg"
      )}
      variants={cardVariants}
      whileHover="hover"
    >
      <Link href={`/articles/${article.id}`}>
        <div className="cursor-pointer">
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.img 
              src={article.imageUrl} 
              alt={article.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              initial={false}
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-background text-foreground">
                {article.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {article.submissionDate}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {article.readingTime} min read
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  By {article.authorName}
                </span>
              </div>
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
