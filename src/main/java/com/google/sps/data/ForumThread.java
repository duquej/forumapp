package com.google.sps.data;

import java.util.ArrayList;



public class ForumThread extends Post {
    private String title;

    public ForumThread(String title,String post, String author, long upvotes, long timeSubmitted, ArrayList<Comment> keyReplies, long replyCount, String postKey, String formattedTimeAgo, ArrayList<String> peopleWhoUpvotedPost){
        super(post,author,upvotes,timeSubmitted,keyReplies,replyCount,postKey,formattedTimeAgo,peopleWhoUpvotedPost);
        this.title = title;
    }
    

}

