import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3c4uripz',
  dataset: 'production',
  apiVersion: '2026-02-09',
  token: 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB',
  useCdn: false,
});

async function fixPosts() {
  const posts = await client.fetch('*[_type == "post"]{_id, body, title}');

  for (const post of posts) {
    console.log('Checking post:', post.title);

    if (!post.body) continue;

    let hasChanges = false;

    // Fix each block's markDefs - remove invalid strong/em entries
    const fixedBody = post.body.map(block => {
      if (block._type !== 'block') return block;

      // Check if any markDefs have _type of strong or em (these are invalid)
      const invalidMarkDefs = (block.markDefs || []).filter(md =>
        md._type === 'strong' || md._type === 'em'
      );

      if (invalidMarkDefs.length === 0) return block;

      hasChanges = true;

      // Get the keys of invalid markDefs
      const invalidKeys = invalidMarkDefs.map(md => md._key);

      // Fix children - replace mark references with direct decorator names
      const fixedChildren = (block.children || []).map(child => {
        if (!child.marks) return child;

        const fixedMarks = child.marks.map(mark => {
          // Find if this mark references an invalid markDef
          const invalidDef = invalidMarkDefs.find(md => md._key === mark);
          if (invalidDef) {
            // Replace with the actual decorator name
            return invalidDef._type;
          }
          return mark;
        });

        return { ...child, marks: fixedMarks };
      });

      // Remove invalid markDefs
      const validMarkDefs = (block.markDefs || []).filter(md =>
        md._type !== 'strong' && md._type !== 'em'
      );

      return {
        ...block,
        markDefs: validMarkDefs,
        children: fixedChildren
      };
    });

    if (hasChanges) {
      // Update the post
      await client.patch(post._id)
        .set({ body: fixedBody })
        .commit();

      console.log('  -> Fixed!');
    } else {
      console.log('  -> OK (no changes needed)');
    }
  }

  console.log('\nAll posts checked!');
}

fixPosts().catch(console.error);
