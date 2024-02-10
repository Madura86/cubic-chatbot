from django.http import Http404
from chatbot.controller.conversation import ai_conversation
from chatbot.models import ChatMessage
from chatbot.serializers import ChatMessageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ChatMessageView(APIView):
    """
    List all chat, or create a new chat.
    """
    def get(self, request, format=None):
        snippets = ChatMessage.objects.all()
        print('---------------------------> ',snippets)
        serializer = ChatMessageSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # serializer = ChatMessageSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print("request------- : ",request.data)
        user_input = request.data['input']
        ai_response = ai_conversation(user_input)
        return Response(ai_response)