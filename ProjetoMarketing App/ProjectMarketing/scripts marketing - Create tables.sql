CREATE SEQUENCE public.sq_pessoa
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_pessoa
    OWNER TO postgres;

CREATE TABLE public.pessoa
(
    id bigint NOT NULL DEFAULT nextval('sq_pessoa'),
    idpessoa uuid NOT NULL DEFAULT uuid_generate_v4(),
    nome text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    email text NOT NULL,
    idsnotificacao text[],
    PRIMARY KEY (id),
    CONSTRAINT uk_pessoa UNIQUE (idpessoa),
    CONSTRAINT uk_pessoa_email UNIQUE (email)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.pessoa
    OWNER to postgres;

CREATE SEQUENCE public.sq_empresa
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_empresa
    OWNER TO postgres;

CREATE TABLE public.empresa
(
    id bigint NOT NULL DEFAULT nextval('sq_empresa'),
    idempresa uuid NOT NULL DEFAULT uuid_generate_v4(),
    nome text NOT NULL,
    cnpj text NOT NULL,
    email text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_empresa_cnpj UNIQUE (cnpj),
    CONSTRAINT uk_empresa_idempresa UNIQUE (idempresa)
)
WITH (
    OIDS = FALSE
);

CREATE SEQUENCE public.sq_usuario
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_usuario
    OWNER TO postgres;

CREATE TABLE public.usuario
(
    id bigint NOT NULL DEFAULT nextval('sq_usuario'),
    idusuario uuid NOT NULL DEFAULT uuid_generate_v4(),
    token text NOT NULL,
    login text NOT NULL,
    idpessoa uuid,
    idempresa uuid,
    redesocial boolean NOT NULL,
    tokenempresaadmin text,
    PRIMARY KEY (id),
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
);

ALTER TABLE public.empresa
    OWNER to postgres;

CREATE SEQUENCE public.sq_perfilempresa
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_perfilempresa
    OWNER TO postgres;

CREATE TABLE public.perfilempresa
(
    id bigint NOT NULL DEFAULT nextval('sq_perfilempresa'::regclass),
    idperfilempresa uuid NOT NULL DEFAULT uuid_generate_v4(),
    idempresa uuid NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    descricao text NOT NULL,
    telefone text NOT NULL,
    idsnotificacao text[],
    telefone2 text,
    PRIMARY KEY (id),
    CONSTRAINT uk_perfilempresa UNIQUE (idperfilempresa),
    CONSTRAINT uk_perfilempresa_empresa UNIQUE (idempresa, idperfilempresa),
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

-- EXECUTAR A PARTE DE CIMA ANTES 

CREATE SEQUENCE public.sq_compartilhamento
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_compartilhamento
    OWNER TO postgres;

 CREATE TABLE public.compartilhamento
(
    id bigint NOT NULL DEFAULT nextval('sq_compartilhamento'::regclass),
    idcompartilhamento uuid NOT NULL DEFAULT uuid_generate_v4(),
    idpessoa uuid NOT NULL,
    codigo text NOT NULL,
    idperfilempresa uuid NOT NULL,
    cupomfoigerado boolean NOT NULL DEFAULT false,
    data date NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_compartilhamento UNIQUE (idcompartilhamento),
    CONSTRAINT fk_pessoa_compartilhamento FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_empresa_compartilhamento FOREIGN KEY (idperfilempresa)
        REFERENCES public.perfilempresa (idperfilempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.compartilhamento
    OWNER to postgres;

CREATE SEQUENCE public.sq_cupom;

ALTER SEQUENCE public.sq_cupom
    OWNER TO postgres;

CREATE TABLE public.cupom
(
    id bigint NOT NULL DEFAULT nextval('sq_cupom'),
    idcupom uuid NOT NULL DEFAULT uuid_generate_v4(),
    idpessoa uuid NOT NULL,
    idperfilempresa uuid NOT NULL,
    data timestamp with time zone NOT NULL,
    datavalidade timestamp with time zone NOT NULL,
    token uuid NOT NULL DEFAULT uuid_generate_v4(),
    idcompartilhamento uuid NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_cupom UNIQUE (idCupom),
    CONSTRAINT uk_cupom_dia UNIQUE (idpessoa, idperfilempresa, data),
    CONSTRAINT uk_cupom_token UNIQUE (idpessoa, idperfilempresa, token),    
    CONSTRAINT fk_perfilempresa FOREIGN KEY (idperfilempresa)
        REFERENCES public.perfilempresa (idperfilempresa) MATCH SIMPLE
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
);

ALTER TABLE public.cupom
    OWNER to postgres;

CREATE SEQUENCE public.sq_venda;

ALTER SEQUENCE public.sq_venda
    OWNER TO postgres;

CREATE TABLE public.venda
(
    id bigint NOT NULL DEFAULT nextval('sq_venda'),
    idvenda uuid NOT NULL DEFAULT uuid_generate_v4(),
    idcupom uuid,
    idpessoa uuid NOT NULL,
    idperfilempresa uuid NOT NULL,
    valor money NOT NULL,
    data date NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_venda UNIQUE (idvenda),
    CONSTRAINT uk_venda_cupom UNIQUE (idcupom, idpessoa, idperfilempresa),    
    CONSTRAINT fk_cupom FOREIGN KEY (idcupom)
        REFERENCES public.cupom (idcupom) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_pessoa FOREIGN KEY (idpessoa)
        REFERENCES public.pessoa (idpessoa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_perfilempresa FOREIGN KEY (idperfilempresa)
        REFERENCES public.perfilempresa (idperfilempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.venda
    OWNER to postgres;


CREATE SEQUENCE public.sq_pessoaempresa ;

ALTER SEQUENCE public.sq_pessoaempresa
    OWNER TO postgres;

  CREATE TABLE public.pessoaempresa
(
    id bigint NOT NULL DEFAULT nextval('sq_pessoaempresa'),
    idpessoa uuid NOT NULL,
    idperfilempresa uuid NOT NULL,
    comentario text,
    nota numeric,
    dataavaliacao date,
    CONSTRAINT pk_pessoaempresa PRIMARY KEY (id),
    CONSTRAINT uk_pessoaempresa UNIQUE (idpessoa, idperfilempresa),
    CONSTRAINT fk_perfilempresa FOREIGN KEY (idperfilempresa)
        REFERENCES public.perfilempresa (idperfilempresa) MATCH SIMPLE
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

CREATE SEQUENCE public.sq_imagemcatalogo
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_imagemcatalogo
    OWNER TO postgres;

    CREATE TABLE public.imagemcatalogo
(
    id bigint NOT NULL DEFAULT nextval('sq_imagemcatalogo'::regclass),
    idimagem uuid NOT NULL DEFAULT uuid_generate_v4(),
    idperfilempresa uuid NOT NULL,
    guidimagem text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_imagemcatalogo UNIQUE (idimagem),
    CONSTRAINT fk_perfilempresa FOREIGN KEY (idperfilempresa)
    REFERENCES public.perfilempresa (idperfilempresa) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.imagemcatalogo
    OWNER to postgres;


CREATE SEQUENCE public.sq_contaempresa;

ALTER SEQUENCE public.sq_contaempresa
    OWNER TO postgres;

CREATE TABLE public.contaempresa
(
    id bigint NOT NULL DEFAULT nextval('sq_contaempresa'),
    idconta uuid NOT NULL DEFAULT uuid_generate_v4(),
    resumo text NOT NULL,
    valorpontos numeric NOT NULL,
    categoria integer NOT NULL,
    idempresa uuid NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_contaempresa UNIQUE (idconta),
    CONSTRAINT fk_empresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.contaempresa
    OWNER to postgres;

CREATE SEQUENCE public.sq_pessoaloja
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE public.sq_pessoaloja
    OWNER TO postgres;

CREATE TABLE public.pessoaloja
(
    id bigint NOT NULL DEFAULT nextval('sq_pessoaloja'::regclass),
    idpessoaloja uuid NOT NULL DEFAULT uuid_generate_v4(),
    idperfilempresa uuid NOT NULL,
    idpessoa uuid NOT NULL,
    pontos numeric NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_pessoaloja UNIQUE (idpessoaloja),
    CONSTRAINT uk_pessoaloja_pessoa UNIQUE (idperfilempresa, idpessoa),
    CONSTRAINT fk_idperfilempresa FOREIGN KEY (idperfilempresa)
        REFERENCES public.perfilempresa (idperfilempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.pessoaloja
    OWNER to postgres;

CREATE SEQUENCE public.sq_adesao
    INCREMENT 1
    START 1
    MINVALUE 1;

CREATE TABLE public.adesao
(
    id bigint NOT NULL DEFAULT nextval('sq_adesao'::regclass),
    idadesao uuid NOT NULL,
    idempresa uuid NOT NULL,
    limitedevendas integer NOT NULL,
    ultimaatualizacao date NOT NULL,
    disponivel boolean NOT NULL,
    CONSTRAINT pk_adesao PRIMARY KEY (id),
    CONSTRAINT uk_edesao UNIQUE (idadesao),
    CONSTRAINT fk_edesao_ideempresa FOREIGN KEY (idempresa)
        REFERENCES public.empresa (idempresa) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.adesao
    OWNER to postgres;