var count = 0;

function threadReplyElements(reply,appendId){
    count++;
    const replyOuterDiv = $('<div/>',{
        class: "commentContainer",
        style: "margin-left: 0px",
        id: 'replyOuterDiv'+count,
    }); 

    const replyUpvoteDiv = $('<div/>',{
        class: "upVoteCommentContainer",
        id: 'replyUpvoteDiv'+count,
    });

    const replyDivForm = $('<form/>',{
        method:"POST",
        class:"replycommentButton",
        action:"/upvote/"+reply.postKey,
        id: 'replyDivForm'+count,
    }); 

    const replyCommentButtonElement = $('<button/>',{
        class:"specificVotingButton",
        type:"submit",
        id: "replyCommentButtonEl"+count
    }); 

    const specificButtonIconElement = $('<div/>',{
        class:"uvcIcon",
        id:"specificButtonIconElement"+count
    }); 

    const upvoteCommentValElement = $('<div/>',{
        class:"upVoteCommentValue",
        text: reply.upvotes
    }); 

    const specificCommentDiv = $('<div/>',{
        class:"specificComment",
        text: reply.post
    }); 


//----------

    const footerMainCommentElement = $('<div/>',{
        class: "scFooter",
        id: "footerMainCommentElement"+count
    });

    const footerCommetImageElement = $('<img/>',{
        class: "iAuthorImg",
        src:"https://avatars.io/twitter/Jamesbrge",
        alt:"Author",
        id: "footerCommentImageElement"+count
    });

    const authorCommentFooterElement = $('<div/>',{
        class: "iAuthorSI",
        text: reply.accountUsername,
        id: "authorCommentFooterElement"+count
    });

    const dotCommentFooterFirstElement = $('<div/>',{
        class: "iDot",
        id: "footerCommentDotFirst"+count
    });

   
    const timeAgoCommentFooterElement = $('<div/>',{
        class: "iTimeAgo",
        text: reply.formattedTimeAgo
    });

    const dotSecondCommentFooterFirstElement = $('<div/>',{
        class: "iDot",
        id: "footerCommentDotSecond"+count
    });

    const replyButtonElement = $('<div/>',{
        class: "iReply",
        text: "Reply"
    });

    const repliesToReplyDiv = $('<div/>',{
        class: "replies",
        id: "repliesToReplyDiv"+count
    });

    //

  

    replyOuterDiv.appendTo("#"+appendId);
    replyUpvoteDiv.appendTo('#replyOuterDiv'+count);
    replyDivForm.appendTo('#replyUpvoteDiv'+count);
    replyCommentButtonElement.appendTo('#replyDivForm'+count);
    specificButtonIconElement.appendTo("#replyCommentButtonEl"+count);
    upvoteCommentValElement.appendTo('#replyUpvoteDiv'+count);
    specificCommentDiv.appendTo('#replyOuterDiv'+count);

    footerMainCommentElement.appendTo('#replyOuterDiv'+count);
    footerCommetImageElement.appendTo("#footerMainCommentElement"+count);
    authorCommentFooterElement.appendTo("#footerMainCommentElement"+count);
    dotCommentFooterFirstElement.appendTo("#footerMainCommentElement"+count);
    timeAgoCommentFooterElement.appendTo("#footerMainCommentElement"+count);
    dotSecondCommentFooterFirstElement.appendTo("#footerMainCommentElement"+count);
    repliesToReplyDiv.appendTo('#replyOuterDiv'+count);

    var currentReplyCount = count;
    if (reply.keyReplies.length >= 1){
        reply.keyReplies.forEach(replyObj => {
            threadReplyElements(replyObj,"repliesToReplyDiv"+currentReplyCount);
        });
    }




    


}

function createReplyFormElements(thread){
    const outerFormElement = $('<form/>',{
        action: "POST",
        action:"/post-comment/"+thread.postKey,
        id: 'replyForm',
    }); 

    const outerFormDiv = $('<div/>',{
        class: "container",
        style: "margin-left: 0px",
        id: 'outerFormDiv',
    }); 

    const outerFormRowDiv = $('<div/>',{
        class: "row",
        id: 'outerRowDiv',
    }); 

    const firstFormColDiv = $('<div/>',{
        class: "col-9",
        id: 'firstFormColDiv',
    }); 

    const firstFormColInput= $('<textarea/>',{
        class:"form-control",
        name:"comment",
        placeholder:"reply",
        id: 'firstFormColInput',
    }); 

    const secondFormColDiv = $('<div/>',{
        class: "col-3",
        id: 'secondFormColDiv',
    }); 

    const secondFormSubmitButton = $('<button/>',{
        type:"submit",
        class:"btn btn-primary",
        text: "Reply",
        id: 'secondFormSubmitButton',
    }); 

    const formDividerUpper = $('<hr/>',{
    });

    const formDividerLower = $('<hr/>',{     
    });

    formDividerUpper.appendTo('#ideaListParent');
    outerFormElement.appendTo('#ideaListParent');
    formDividerLower.appendTo('#ideaListParent');
    outerFormDiv.appendTo('#replyForm');
    outerFormRowDiv.appendTo("#outerFormDiv");
    firstFormColDiv.appendTo("#outerRowDiv");
    firstFormColInput.appendTo("#firstFormColDiv");
    secondFormColDiv.appendTo("#outerRowDiv");
    secondFormSubmitButton.appendTo("#secondFormColDiv");

}

function createThreadElements(thread){
    const outerMostParentElement = $('<div/>',{
        class: 'ideaList__inner cursorOverride',
        id: 'ideaListParent',
        'data-location': 'https://google.com'
    });

    const innerTopElement = $('<div/>',{
        class: 'ideaList__inner-top',
        id: 'innerTopElement'
    });

    const threadTitleElement = $('<h3/>',{
        class: 'ideaList__inner-top-title',
        text: thread.title
    })

    const votingButtonElement = $('<div/>',{
        class: 'votingButton',
        "data-upvote":"/api/ideas/5b5743c801e21300044b7289/heart",
        id: 'votingButtonElement'
    });

    const upvoteElement = $('<div/>',{
        class: 'iUpVoteIcon',
        id: 'upvoteElement'
    });

    const svgElement = $('<svg/>',{
        xmlns:'http://www.w3.org/2000/svg',
        'width': '20',
        'height': '20',
        'viewBox': "0 0 20 20",
        
        id: 'svgElement'
    });

    const upvotePathElement=  $('<path/>',{
        d: "M0,10 C-6.76353751e-16,4.4771525 4.4771525,1.01453063e-15 10,0 C15.5228475,-1.01453063e-15 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 6.76353751e-16,15.5228475 0,10 Z M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z M10.7,7.46 L14.25,11 L12.84,12.41 L10,9.6 L7.17,12.4 L5.76,11 L10,6.76 L10.7,7.46 Z"
    });

    const upvoteScoreElement = $('<div/>',{
        class: "iUpVoteScore",
        text: thread.upvotes
    });
    const threadBodyElement = $('<div/>',{
        class: "iDesc",
        text: thread.post,
        id: "threadBodyElement"
    });

    const footerMainElement = $('<div/>',{
        class: "iFooter",
        id: "footerMainElement"
    });

    const subFooterElement = $('<div/>',{
        class: "iFooterA",
        id: "subFooterElement"
    });

    const footerImageElement = $('<img/>',{
        class: "iAuthorImg",
        src:"https://avatars.io/twitter/Jamesbrge",
        alt:"Author",
        id: "footerImageElement"
    });

    const authorFooterElement = $('<div/>',{
        class: "iAuthor",
        text: thread.accountUsername,
        id: "authorFooterElement"
    });
//-----------------------------------------------------------
  
    
    outerMostParentElement.appendTo('#ideaList');
    innerTopElement.appendTo('#ideaListParent');
    threadTitleElement.appendTo('#innerTopElement');
    votingButtonElement.appendTo('#innerTopElement');
    upvoteElement.appendTo('#votingButtonElement');
    svgElement.appendTo('#upvoteElement');
    upvotePathElement.appendTo('#svgElement');
    upvoteScoreElement.appendTo('#innerTopElement');
    threadBodyElement.appendTo("#ideaListParent");

    footerMainElement.appendTo("#ideaListParent");
    subFooterElement.appendTo('#footerMainElement');
    footerImageElement.appendTo("#subFooterElement");
    authorFooterElement.appendTo("#subFooterElement");

    //----------
    createReplyFormElements(thread);
    const replyListElement = $('<ul/>',{
        id: 'replyListElement',
    }); 

    replyListElement.appendTo("#ideaListParent");

    if (thread.keyReplies.length >= 1){
        thread.keyReplies.forEach(replyObj => {
            threadReplyElements(replyObj,"replyListElement")
        });
    }


}



function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

async function getRequest(){

  requestKey = getParameterByName("t");
  
  const response = await fetch(`/view-thread/${requestKey}`);
  if(response.status != 200){
    window.location.replace("/request-not-found");
    return;
  }
  const threadRequestJson = await response.json();
  createThreadElements(threadRequestJson);

}