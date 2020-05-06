import React, { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  // any other props that come into the component
}

function I({ children }: IProps) {
  return <div className='indent'>{children}</div>
}
function S({ children }: IProps) {
  return <div className='spaced-div'>{children}</div>
}

export default function Grammar() {
  return (
    <div>
      <S>
        Tenses
        <I>Simple Present</I>
        <I>Present Continuous</I>
        <I>...</I>
      </S>
      <S>
        Structures of Language
        <I>
          Noun: Person/Place/Thing/Idea
          <I>
            Proper Noun: any direct reference to a named thing, which in English
            is written with capital letter (e.g. Manhattan)
          </I>
          <I>
            Common Noun: any general reference to a person/place/thing/idea.
            (e.g. city)
          </I>
          <I>
            Pronoun: a pronoun has been theorized to be a word that substitutes
            for a noun or noun phrase.&nbsp;
            <a
              href='https://en.wikipedia.org/wiki/Pronoun'
              target='_blank'
              rel='noopener noreferrer'
            >
              wikipedia
            </a>
          </I>
        </I>
        <I>Verb: Action</I>
        <I>
          <I>
            Compound Verb: a verb which consists of a noun and a helper verb
            (e.g. &lt;to become&gt; &lt;awake&gt; = &lt;verb&gt; &lt;noun&gt;)
          </I>
          <I>
            Transitive Verb: A verb which relates with an object (e.g. to cook
            food)
          </I>
          <I>
            Intransitive Verb: A verb which doesn't relate with an object (e.g.
            to sleep)
          </I>
        </I>
        <I>Adjective: Description (e.g. blue)</I>
        <I>Adverb: ...</I>
        <I>...</I>
      </S>
      <S>
        Infinitive: a verb, generally not having an expressed subject, and in
        many languages the infinitive is a single word, often with a
        characteristic inflective ending&nbsp;
        <a
          href='https://en.wikipedia.org/wiki/Infinitive'
          target='_blank'
          rel='noopener noreferrer'
        >
          wikipedia
        </a>
      </S>
      <S>
        Conjugation: the creation of derived forms of a verb from its principal
        parts by inflection&nbsp;
        <a
          href='https://en.wikipedia.org/wiki/Grammatical_conjugation'
          target='_blank'
          rel='noopener noreferrer'
        >
          wikipedia
        </a>
      </S>
    </div>
  )
}
