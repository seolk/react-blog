class Api::CommentsController < ApplicationController
  before_action :set_post
  before_action :set_comment, only: [:show, :update, :destroy]


   def index
      render json: @comments = @post.comments.all
      end
  
   def show 
      render json: @comment
      end
  
    def create
      comment = @post.comments.new(comment_params)
  
      if comment.save
        render json: comment 
      else
      render json: comment.errors, status: 422
      end
    end
  
    def update
    @comment = Post.comments.new(comment_params)
      if @comment.update(comment_params)
        render json: comment 
      else
        render json: comment.errors, status: 422
      end
    end
  
    def destroy
      @comment.destroy 
    end
  
    private 
      def set_comment
        @comment = Comment.find(params[:id])
      end
  
      def comment_params
        params.require(:comment).permit(:subject, :body, :post_id)
      end
  
      def set_post
        @post = Post.find(params[:post_id])
      end
  

end
