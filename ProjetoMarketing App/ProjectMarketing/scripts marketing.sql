CREATE DATABASE marketing
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- cria extensao do uuid generator
-- uuid_generate_v4()
-- valor padrao da coluna

CREATE SEQUENCE public.sq_usuario
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_usuario
    OWNER TO postgres;

CREATE SEQUENCE public.sq_empresa
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_empresa
    OWNER TO postgres;

CREATE SEQUENCE public.sq_pessoa
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_pessoa
    OWNER TO postgres;

CREATE TABLE public.pessoa
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idpessoa integer NOT NULL DEFAULT nextval('sq_pessoa'),
    nome text NOT NULL,
    cpfcnpj text,
    email text NOT NULL,
    telefone text,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    CONSTRAINT pk_pessoa PRIMARY KEY (id),
    CONSTRAINT uk_pessoa UNIQUE (idpessoa),
    CONSTRAINT uk_pessoa_email UNIQUE (email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.pessoa
    OWNER to postgres;

CREATE TABLE public.empresa
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idempresa integer NOT NULL DEFAULT nextval('sq_empresa'),
    nome text NOT NULL,
    cnpj text NOT NULL,
    email text NOT NULL,
    telefone text NOT NULL,
    telefone2 text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    CONSTRAINT pk_empresa PRIMARY KEY (id),
    CONSTRAINT uk_empresa UNIQUE (idempresa),
    CONSTRAINT uk_empresa_cnpj UNIQUE (cnpj)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.empresa
    OWNER to postgres;


CREATE TABLE public.usuario
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idusuario integer NOT NULL DEFAULT nextval('sq_usuario'),
    token text NOT NULL,
    login text NOT NULL,
    senha text NOT NULL,
    idpessoa integer,
    idempresa integer,
    CONSTRAINT uk_usuario UNIQUE (idusuario,token),
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
    REFERENCES public.empresa (idempresa) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
    CONSTRAINT fk_pessoa FOREIGN KEY (idpessoa)
    REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usuario
    OWNER to postgres;

CREATE SEQUENCE public.sq_venda;

ALTER SEQUENCE public.sq_venda
    OWNER TO postgres;

CREATE SEQUENCE public.sq_cupom;

ALTER SEQUENCE public.sq_cupom
    OWNER TO postgres;

CREATE TABLE public.cupom
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idpessoa integer NOT NULL,
    idempresa integer NOT NULL,
    data date NOT NULL,
    token uuid NOT NULL DEFAULT uuid_generate_v4(),
    idCupom bigint NOT NULL DEFAULT nextval('sq_cupom'),
    desconto numeric NOT NULL,
    idcompartilhamento bigint NOT NULL,
    CONSTRAINT pk_cupom PRIMARY KEY (id),
    CONSTRAINT uk_cupom UNIQUE (idCupom),
    CONSTRAINT uk_cupom_token UNIQUE (idpessoa, idempresa, token),    
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_pessoa FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_compartilhamento FOREIGN KEY (idcompartilhamento)
    REFERENCES public.compartilhamento (idcompartilhamento) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.cupom
    OWNER to postgres;

CREATE TABLE public.venda
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idvenda bigint NOT NULL DEFAULT nextval('sq_venda'),
    idcupom bigint,
    idpessoa integer NOT NULL,
    idempresa integer NOT NULL,
    valor money NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY (id),
    CONSTRAINT uk_venda UNIQUE (idvenda),
    CONSTRAINT uk_venda_cupom UNIQUE (idcupom, idpessoa, idempresa),    
    CONSTRAINT fk_cupom FOREIGN KEY (idcupom)
        REFERENCES public.cupom (idcupom) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_pessoa FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.venda
    OWNER to postgres;

    CREATE TABLE public.perfilpessoa
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idpessoa integer NOT NULL,
    foto bytea,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.perfilpessoa
    OWNER to postgres;

ALTER TABLE public.perfilpessoa
    ADD CONSTRAINT pessoa_pk FOREIGN KEY (idpessoa)
    REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

CREATE TABLE public.perfilempresa
(
    id uuid NOT NULL,
    idempresa integer NOT NULL,
    resumo text NOT NULL,
    descontocompartilhamento numeric NOT NULL,
    valorpontos numeric NOT NULL,
    categorias integer[] NOT NULL,
    COLUMN imagem bytea,
    PRIMARY KEY (idempresa),
    CONSTRAINT uk_perfilempresa UNIQUE (idempresa),
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.perfilempresa
    OWNER to postgres;

    CREATE TABLE public.pessoaempresa
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idpessoa integer NOT NULL,
    idempresa integer NOT NULL,
    pontuacao integer,
    comentario text,
    nota numeric,
    CONSTRAINT pk_pessoaempresa PRIMARY KEY (id),
    CONSTRAINT uk_pessoaempresa UNIQUE (idpessoa, idempresa),
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_pessoa FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.pessoaempresa
    OWNER to postgres;

CREATE OR REPLACE FUNCTION public.geodistance(alat double precision, alng double precision, blat double precision, blng double precision)
  RETURNS double precision AS
$BODY$
SELECT asin(
  sqrt(
    sin(radians($3-$1)/2)^2 +
    sin(radians($4-$2)/2)^2 *
    cos(radians($1)) *
    cos(radians($3))
  )
) * 12742 AS distance;
$BODY$
  LANGUAGE sql IMMUTABLE
  COST 100;

  CREATE TABLE public.compartilhamento
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    idcompartilhamento bigint NOT NULL DEFAULT nextval('sq_compartilhamento'::regclass),
    idpessoa integer NOT NULL,
    idspessoas integer[] NOT NULL,
    idempresa integer NOT NULL,
    data date NOT NULL,
    CONSTRAINT pk_compartilhamento PRIMARY KEY (id),
    CONSTRAINT uk_compartilhamento UNIQUE (idcompartilhamento),
    CONSTRAINT uk_compartilhamento_mesmodia UNIQUE (idpessoa, idempresa, idspessoas, data),
    CONSTRAINT fk_pessoa_compartilhamento FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_empresa_compartilhamento FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.compartilhamento
    OWNER to postgres;

    CREATE TABLE public.imagemperfil
(
    id uuid NOT NULL,
    idempresa integer,
    idpessoa integer,
    imagem bytea NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_pessoa FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.imagemperfil
    OWNER to postgres;

    CREATE TABLE public."imagemCatalogo"
(
    id uuid NOT NULL,
    idempresa integer NOT NULL,
    idimagem bigint NOT NULL DEFAULT nextval('sq_imagem'::regclass),
    PRIMARY KEY (id),
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."imagemCatalogo"
    OWNER to postgres;