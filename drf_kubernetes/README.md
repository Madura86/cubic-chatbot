### Cubic Chatbot Backend ###############################################
### Author: Janaka Weerarathna
### Release: 1.0Beta

POST http://127.0.0.1:8000/chatbot/api/messages/
{
  "input":"i am weerarathna from matara town"
}

Response:
{
  "role": "assistant",
  "content": "Nice to meet you, Weerarathna from Matara town! How can I assist you today?"
}

## Build app
docker-compose build
docker-compose up

## ToDo

1. finetune code
2. Add table to track user 
3. update pip install -U langchain-community
   from langchain_community.chat_models import ChatOpenAI

