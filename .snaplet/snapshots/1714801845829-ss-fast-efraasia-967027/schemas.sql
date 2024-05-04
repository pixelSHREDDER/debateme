--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.1 (Ubuntu 16.1-1.pgdg22.04+1)

-- Started on 2024-05-04 05:50:48 Africa

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 82020)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 82031)
-- Name: Debate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Debate" (
    id integer NOT NULL,
    topic character varying(255) NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "creatorId" integer NOT NULL,
    "opponentId" integer
);


--
-- TOC entry 216 (class 1259 OID 82030)
-- Name: Debate_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Debate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 216
-- Name: Debate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Debate_id_seq" OWNED BY public."Debate".id;


--
-- TOC entry 219 (class 1259 OID 82039)
-- Name: Turn; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Turn" (
    id integer NOT NULL,
    body jsonb,
    "debateId" integer NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 82038)
-- Name: Turn_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Turn_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 218
-- Name: Turn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Turn_id_seq" OWNED BY public."Turn".id;


--
-- TOC entry 221 (class 1259 OID 82054)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 82053)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 220
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 215 (class 1259 OID 82021)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 3194 (class 2604 OID 82034)
-- Name: Debate id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Debate" ALTER COLUMN id SET DEFAULT nextval('public."Debate_id_seq"'::regclass);


--
-- TOC entry 3196 (class 2604 OID 82042)
-- Name: Turn id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn" ALTER COLUMN id SET DEFAULT nextval('public."Turn_id_seq"'::regclass);


--
-- TOC entry 3198 (class 2604 OID 82057)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3203 (class 2606 OID 82037)
-- Name: Debate Debate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Debate"
    ADD CONSTRAINT "Debate_pkey" PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 82046)
-- Name: Turn Turn_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn"
    ADD CONSTRAINT "Turn_pkey" PRIMARY KEY (id);


--
-- TOC entry 3208 (class 2606 OID 82062)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 82029)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3206 (class 1259 OID 82063)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3209 (class 2606 OID 82064)
-- Name: Debate Debate_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Debate"
    ADD CONSTRAINT "Debate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3210 (class 2606 OID 82069)
-- Name: Debate Debate_opponentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Debate"
    ADD CONSTRAINT "Debate_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3211 (class 2606 OID 82047)
-- Name: Turn Turn_debateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn"
    ADD CONSTRAINT "Turn_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES public."Debate"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3212 (class 2606 OID 82074)
-- Name: Turn Turn_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn"
    ADD CONSTRAINT "Turn_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-05-04 05:50:58 Africa

--
-- PostgreSQL database dump complete
--
