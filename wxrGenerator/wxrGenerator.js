import xmlbuilder from 'xmlbuilder';

const PRODUCT_VERSION = '3.9.2';

class Generator {

    constructor({
        name,
        url,
        description,
        language = 'en-US',
        base_site_url = url,
        base_blog_url = url
    }) {
        this.xml = xmlbuilder.create('rss')
            .att('xmlns:excerpt', 'http://wordpress.org/export/1.2/expert')
            .att("xmlns:content", "http://purl.org/rss/1.0/modules/content/")
            .att("xmlns:wfw", "http://wellformedweb.org/CommentAPI/")
            .att("xmlns:dc", "http://purl.org/dc/elements/1.1/")
            .att("xmlns:wp", "http://wordpress.org/export/1.2/")
            .att("version", "2.0");
        this.channel = this.xml.ele('channel');
        this.channel.ele('wp:wxr_version', {}, 1.2);
        this.channel.ele('title', {}, name);
        this.channel.ele('link', {}, url);
        this.channel.ele('description', {}, description);
        this.channel.ele('language', {}, language);
        this.channel.ele('wp:base_site_url', {}, base_site_url);
        this.channel.ele('wp:base_blog_url', {}, base_blog_url);
        this.channel.ele('generator', {}, 'https://npmjs.com/wxr-generator');
    }
    
    rId = () => {
        let id = Math.floor(Math.random() * 100000);
        return id;
    }



    addPost({
        id = this.rId(),
        url,
        date = new Date(),
        title,
        slug = slug,
        author = 'wordpress',
        content,
        summary,
        comment_status = 'open',
        ping_status = 'open',
        status = 'publish',
        type = 'post',
        password = '',
        categories,
        tags,
        imageID
    }) {
        let post = this.channel.ele('item');
        post.ele('title').cdata(title);
        post.ele('link').cdata(url);
        post.ele('pubDate').cdata(date.toUTCString());
        post.ele('dc:creator').cdata(author);
        post.ele('guid', {isPermaLink: true}).cdata(slug);
        post.ele('description').cdata(summary);
        post.ele('content:encoded').cdata(content);
        post.ele('excerpt:encoded').cdata(summary);
        post.ele('wp:post_id', {}, id);
        post.ele('wp:post_date').cdata(date.toISOString());
        post.ele('wp:comment_status').cdata(comment_status);
        post.ele('wp:ping_status').cdata(ping_status);
        post.ele('wp:post_name').cdata(slug);
        post.ele('wp:status').cdata(status);
        post.ele('wp:post_parent', {}, 0);
        post.ele('wp:menu_order', {}, 0);
        post.ele('wp:post_type', {}, type);
        post.ele('wp:post_password').cdata(password);
        post.ele('wp:is_sticky', {}, 0);
        if (Array.isArray(categories)) {
            categories.forEach(cate => {
                post.ele('category', {
                    domain: 'category',
                    nicename: cate.slug
                }).cdata(cate.name)
            });
        }
        if (Array.isArray(tags)) {
            tags.forEach(tag => post.ele('category', {
                domain: 'post_tag',
                nicename: tag.slug
            }).cdata(tag.name));
        }
        if (imageID && Number.isInteger(imageID)) {
            post.ele({
                'wp:postmeta': [{
                    'wp:meta_key': '_thumbnail_id',
                    'wp:meta_value': imageID
                }]
            });
        }

        return this;
    }

   
    addPage(page) {
        page.type = 'page';
        this.addPost(page);

        return this;
    }

    
    addUser({
        id = this.rId(),
        username,
        email,
        display_name,
        first_name = '',
        last_name = ''
    }) {
        let user = this.channel.ele('wp:author');
        user.ele('wp:author_id', {}, id);
        user.ele('wp:author_login', {}, username);
        user.ele('wp:author_email', {}, email);
        user.ele('wp:author_display_name', {}, display_name || username);
        user.ele('wp:author_first_name', {}, first_name);
        user.ele('wp:author_last_name', {}, last_name);

        return this;
    }

   
    addTag({
        id = this.rId(), 
        name, 
        slug, 
        description = ''
    }) {
        let tag = this.channel.ele('wp:tag');
        tag.ele('wp:term_id', {}, id);
        tag.ele('wp:tag_slug').cdata(slug);
        tag.ele('wp:tag_name').cdata(name);
        tag.ele('wp:tag_description', {}, description);

        return this;
    }

   
    addCategory({
        id = this.rId(),
        name,
        slug,
        parent_id = 0,
        description = ''
    }) {
        let category = this.channel.ele('wp:category');
        category.ele('wp:term_id', {}, id);
        category.ele('wp:category_nicename').cdata(slug);
        category.ele('wp:cat_name').cdata(name);
        category.ele('wp:category_description', {}, '');
        if (parent_id) {
            category.ele('wp:category_parent', {}, parent_id);
        }

        return this;
    }


   
    addAttachment({
        id = this.rId(),
        url,
        date = new Date(),
        file,
        title= "",
        author = 'wordpress',
        description = '',
        post_id = 0,
        comment_status = 'open',
        ping_status = 'closed',
        meta_data,
        attachment_type = 'product_image'
    }) {
        let attach = this.channel.ele('item');
        attach.ele('title', {}, title);
        attach.ele('link', {}, url);
        attach.ele('pubDate', {}, date.toUTCString());
        attach.ele('dc:creator', {}, author);
        attach.ele('guid', {isPermaLink: false}, url);
        attach.ele('description').cdata(description);
        attach.ele('content:encoded').cdata(description);
        attach.ele('excerpt:encoded').cdata(description);
        attach.ele('wp:post_id', {}, id);
        attach.ele('wp:post_date', {}, date.toISOString());
        attach.ele('wp:comment_status').cdata(comment_status);
        attach.ele('wp:ping_status').cdata(ping_status);
        attach.ele('wp:post_name').cdata(title);
        attach.ele('wp:status').cdata('inherit');
        attach.ele('wp:post_parent', {}, post_id);
        attach.ele('wp:menu_order', {}, 0);
        attach.ele('wp:post_type', {}, 'attachment');
        attach.ele('wp:post_password').cdata('');
        attach.ele('wp:is_sticky', {}, 0);
        attach.ele('wp:attachment_url').cdata(url);
        if (attachment_type === 'product_image') {
            let postMetaBlock = attach.ele('wp:postmeta');
            postMetaBlock.ele('wp:meta_key', {}, '_wc_attachment_source');
            postMetaBlock.ele('wp:meta_value').cdata(url);
        }
        if (typeof file !== 'undefined') {
            attach.ele({
                'wp:postmeta': [
                    {
                        'wp:meta_key': '_wp_attached_file',
                        'wp:meta_value': file
                    },
                    {
                        'wp:meta_key': '_wp_attachment_metadata',
                        'wp:meta_value': meta_data
                    },
                    {
                        'wp:meta_key': '_wp_attachment_image_alt',
                        'wp:meta_value': title
                    }
                ]
            });
        }

        return this;
    }

  

    stringify(options= {}) {
        return this.xml.end({
            pretty: false,
            indent: '    ',
            newline: '\n',
            ...options
        });
    }


}


export default Generator;