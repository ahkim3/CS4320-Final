FROM python:3

WORKDIR /app

RUN pip install flask

RUN pip install flask-cors

COPY . . 

EXPOSE 5555

CMD [ "python3", "app.py" ]