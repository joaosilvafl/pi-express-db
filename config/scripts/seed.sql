CREATE DATABASE exemplo_db;

CREATE TABLE
    alunos (
        id_aluno varchar PRIMARY KEY,
        cpf_aluno char(11) NOT NULL UNIQUE,
        nome_aluno varchar(80) NOT NULL,
        nome_social_aluno varchar(80),
        email_aluno varchar(40),
        telefone_aluno bigint NOT NULL,
        data_nascimento date NOT NULL,
        genero char(1) CHECK (genero in ('M', 'F')),
        prioridade char(1) NOT NULL CHECK (prioridade in ('A', 'M', 'B')),
        inicio_atendimento date NOT NULL DEFAULT CURRENT_DATE,
        fim_atendimento date
    );

CREATE TABLE
    cursos (
        id_curso varchar PRIMARY KEY,
        descricao_curso varchar(255) NOT NULL,
        turno varchar(15) NOT NULL CHECK (turno IN ('Matutino', 'Vespertino', 'Noturno')),
        modalidade varchar(255) NOT NULL CHECK (
            modalidade IN (
                'Iniciação',
                'Capacitação',
                'Qualificação',
                'Aperfeiçoamento',
                'Técnico',
                'Superior - Licenciatura',
                'Superior - Bacharel',
                'Superior - Tecnologia',
                'Pós Graduação Lato Sensu - Especialização',
                'Pós-Graduação Stricto Sensu - Mestrado',
                'Pós-Graduação Stricto Sensu - Doutorado'
            )
        ),
        eixo_dpto varchar(255) NOT NULL,
        unidade_campus varchar(255) NOT NULL,
        semestral boolean DEFAULT true,
        presencial boolean DEFAULT true
    );

CREATE TABLE
    alunos_cursos (
        matricula varchar PRIMARY KEY,
        situacao varchar NOT NULL CHECK (
            situacao IN ('Matriculado', 'Concluído', 'Evadido', 'Trancado')
        ),
        fk_aluno varchar NOT NULL REFERENCES alunos (id_aluno),
        fk_curso varchar NOT NULL REFERENCES cursos (id_curso)
    );

INSERT INTO
    alunos
VALUES
    (
        '12345',
        '1245678900',
        'João Silva',
        'João',
        'joaosilva@email.com',
        6299998888,
        '1990-01-01',
        'M',
        'B',
        '2023-03-01',
        '2024-02-28'
    ),
    (
        '23456',
        '23456789011',
        'Maria Oliveira',
        'Maria',
        'mariaoliveira@email.com',
        6298887777,
        '1991-02-02',
        'F',
        'B',
        '2023-04-01',
        '2024-03-31'
    ),
    (
        '34567',
        '34567890122',
        'Pedro Souza',
        'Pedro',
        'pedrosouza@email.com',
        6297776666,
        '1992-03-03',
        'M',
        'B',
        '2023-05-01',
        '2024-04-30'
    ),
    (
        '45678',
        '45678901233',
        'Ana Costa',
        'Ana',
        'anacosta@email.com',
        6296665556,
        '1993-04-04',
        'F',
        'B',
        '2023-06-01',
        '2024-05-31'
    ),
    (
        '56789',
        '56789012344',
        'Bruno Santos',
        'Bruno',
        'brunosantos@email.com',
        6295554444,
        '1994-05-05',
        'M',
        'B',
        '2023-07-01',
        '2024-06-30'
    ),
    (
        '67890',
        '67890123455',
        'Camila Fernandes',
        'Camila',
        'camilofernandes@email.com',
        6294443333,
        '1995-06-06',
        'F',
        'B',
        '2023-08-01',
        '2024-07-31'
    ),
    (
        '78901',
        '78901234566',
        'Diego Pereira',
        'Diego',
        'diegoproeira@email.com',
        6293332222,
        '1996-07-07',
        'M',
        'B ',
        '2023-09-01',
        '2024-08-31'
    ),
    (
        '89012',
        '89012345677',
        'Eduardo Silva',
        'Eduardo',
        'eduardosilva@email.com',
        6292221111,
        '1997-08-08',
        'M',
        'B',
        '2023-10-01',
        '2024-09-30'
    ),
    (
        '90123',
        '90123456788',
        'Fernanda Andrade',
        'Fernanda',
        'fernandaandrade@email.com',
        6291110000,
        '1998-09-09',
        'F',
        'B',
        '2023-11-01',
        '2024-10-31'
    ),
    (
        '12348',
        '12345678999',
        'Gabriel Martins',
        'Gabriel',
        'gabrielmartins@email.com',
        6290009999,
        '1999-10-10',
        'M',
        'B',
        '2023-12-01',
        '2024-11-30'
    );

INSERT INTO
    cursos (
        id_curso,
        descricao_curso,
        turno,
        modalidade,
        eixo_dpto,
        unidade_campus
    )
VALUES
    (
        '1',
        'Introdução à Programação',
        'Matutino',
        'Iniciação',
        'TI',
        'Campus A'
    ),
    (
        '2',
        'Design Gráfico',
        'Vespertino',
        'Aperfeiçoamento',
        'Artes',
        'Campus B'
    ),
    (
        '3',
        'Marketing Digital',
        'Noturno',
        'Qualificação',
        'Administração',
        'Campus C'
    ),
    (
        '4',
        'Técnico em Enfermagem',
        'Matutino',
        'Técnico',
        'Saúde',
        'Campus D'
    ),
    (
        '5',
        'Engenharia Civil',
        'Vespertino',
        'Superior - Bacharel',
        'Engenharia',
        'Campus E'
    ),
    (
        '6',
        'Gastronomia',
        'Noturno',
        'Superior - Tecnologia',
        'Culinária',
        'Campus F'
    ),
    (
        '7',
        'Pós-Graduação em Gestão Empresarial',
        'Matutino',
        'Pós Graduação Lato Sensu - Especialização',
        'Administração',
        'Campus G'
    ),
    (
        '8',
        'Mestrado em Ciência da Computação',
        'Vespertino',
        'Pós-Graduação Stricto Sensu - Mestrado',
        'TI',
        'Campus H'
    ),
    (
        '9',
        'Doutorado em Medicina',
        'Noturno',
        'Pós-Graduação Stricto Sensu - Doutorado',
        'Saúde',
        'Campus I'
    ),
    (
        '10',
        'Curso de Fotografia',
        'Matutino',
        'Capacitação',
        'Artes',
        'Campus J'
    );

INSERT INTO
    alunos_cursos (matricula, situacao, fk_aluno, fk_curso)
VALUES
    ('123456', 'Matriculado', '12345', '1'),
    ('789456', 'Trancado', '23456', '2'),
    ('234567', 'Matriculado', '34567', '3'),
    ('456789', 'Evadido', '45678', '4'),
    ('678901', 'Concluído', '56789', '5'),
    ('890123', 'Matriculado', '67890', '6'),
    ('102345', 'Evadido', '78901', '7'),
    ('534567', 'Matriculado', '89012', '8'),
    ('956789', 'Trancado', '90123', '9'),
    ('378901', 'Matriculado', '12348', '10');