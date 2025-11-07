import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all services
export async function getServices() {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch services');
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch service');
  }
}

// Fetch all team members
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

// Fetch all testimonials
export async function getTestimonials() {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Fetch all case studies
export async function getCaseStudies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch case studies');
  }
}

// Fetch single case study by slug
export async function getCaseStudyBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch case study');
  }
}

// Fetch about page content
export async function getAboutPage() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about-pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch about page');
  }
}

// ====== BLOG FUNCTIONS ======

// Fetch posts with pagination
export async function getPosts(skip: number = 0, limit: number = 9) {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Manual sorting by published_date (newest first)
    const sortedPosts = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });

    // Manual pagination
    const paginatedPosts = sortedPosts.slice(skip, skip + limit);
    
    return {
      posts: paginatedPosts,
      total: sortedPosts.length,
      hasMore: skip + limit < sortedPosts.length
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { posts: [], total: 0, hasMore: false };
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

// Fetch related posts based on categories and tags
export async function getRelatedPosts(currentPostId: string, categoryIds: string[] = [], tagIds: string[] = [], limit: number = 3) {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Filter out current post and find posts with matching categories or tags
    const relatedPosts = response.objects
      .filter((post: any) => {
        if (post.id === currentPostId) return false;
        
        const postCategoryIds = post.metadata?.categories?.map((cat: any) => cat.id) || [];
        const postTagIds = post.metadata?.tags?.map((tag: any) => tag.id) || [];
        
        const hasMatchingCategory = categoryIds.some(id => postCategoryIds.includes(id));
        const hasMatchingTag = tagIds.some(id => postTagIds.includes(id));
        
        return hasMatchingCategory || hasMatchingTag;
      })
      .slice(0, limit);
    
    return relatedPosts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch related posts');
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string, skip: number = 0, limit: number = 9) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.categories': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Manual sorting by published_date
    const sortedPosts = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });

    const paginatedPosts = sortedPosts.slice(skip, skip + limit);
    
    return {
      posts: paginatedPosts,
      total: sortedPosts.length,
      hasMore: skip + limit < sortedPosts.length
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { posts: [], total: 0, hasMore: false };
    }
    throw new Error('Failed to fetch posts by category');
  }
}

// Fetch posts by tag
export async function getPostsByTag(tagId: string, skip: number = 0, limit: number = 9) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.tags': tagId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Manual sorting by published_date
    const sortedPosts = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });

    const paginatedPosts = sortedPosts.slice(skip, skip + limit);
    
    return {
      posts: paginatedPosts,
      total: sortedPosts.length,
      hasMore: skip + limit < sortedPosts.length
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { posts: [], total: 0, hasMore: false };
    }
    throw new Error('Failed to fetch posts by tag');
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Manual sorting by published_date
    const sortedPosts = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
    
    return sortedPosts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch single category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Fetch all tags
export async function getTags() {
  try {
    const response = await cosmic.objects
      .find({ type: 'tags' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tags');
  }
}

// Fetch single tag by slug
export async function getTagBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'tags', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch tag');
  }
}

// Fetch single author by slug
export async function getAuthorBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

// Fetch all authors
export async function getAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}