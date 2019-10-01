# Medium Blogs Backend

## How to run

1. Create venv

- Unix based

```
$ python3 -m venv venv
```

- Windows (with Anaconda)

```
>> conda create -n venv python=3.5
```

2. Activate venv

- Unix based
```
$ source venv/bin/activate
```

- Windows (with Anaconda)

```
>> conda activate venv
```

3. Install `requeriments`

```
$ pip install -r requeriments.txt
```

4. Make migrations

```
$ python manage.py makemigrations
$ python manage.py migrate
```

5. Run server

```
$ python manage.py runserver
```

# Front

1. Install dependencies

```
$ npm i
```

2. Run project

```
$ npm start
```