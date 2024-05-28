from app import app
if __name__ == '__main__':
    # Change the host parameter to '0.0.0.0' to listen on all network interfaces
    # app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)
