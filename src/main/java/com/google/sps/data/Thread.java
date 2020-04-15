package com.google.sps.data;

import java.util.ArrayList;


public class Thread extends Post {
    private String title;

    public Thread(String title,String post, String author, long upvotes, long timeSubmitted, ArrayList<Long> keyReplies, long replyCount){
        super(post,author,upvotes,timeSubmitted,keyReplies,replyCount);
        this.title = title;
    }
    

}

