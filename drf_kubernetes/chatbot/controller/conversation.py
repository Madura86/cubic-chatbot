# myapp/views.py
# import streamlit as st
import speech_recognition as sr
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
import pyttsx3

prompt = PromptTemplate(
    input_variables=["chat_history", "question"],
    template="""You are a very kind and friendly AI assistant. You are
    currently having a conversation with a human. Answer the questions
    in a kind and friendly tone with some sense of humor.
    
    chat_history: {chat_history},
    Human: {question}
    AI:"""
)

llm = ChatOpenAI(openai_api_key="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")
memory = ConversationBufferMemory()
llm_chain = ConversationChain(
    llm=llm,
    memory=memory
)

def ai_conversation(user_input):
    try:
        ai_response = llm_chain.predict(input=user_input)

        # Text-to-speech using pyttsx3  :::: Testing
        # engine = pyttsx3.init()
        # engine.say(ai_response)
        # engine.runAndWait()

        return {"role": "assistant", "content": ai_response}

    except Exception as e:
        # st.error(f"Error predicting AI response: {e}")
        return {"role": "assistant", "content": "Sorry, I encountered an error."}
