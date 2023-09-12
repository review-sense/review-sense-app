# Use an official Python runtime as the base image
FROM python:3

# Set the working directory in the container
WORKDIR /app

ENV FLASK_APP=app.py

# Copy the requirements file into the container
COPY requirements.txt .

# Install app dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the Flask app runs on
EXPOSE 8000

# Define the command to run your app
CMD ["python", "app.py"]
