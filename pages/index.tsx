import type { NextPage } from 'next'
import {prisma} from "../db/client"

const Home: NextPage = (props) => {
  return (
    <div>
      <p className='text-4xl'>{props.questions}</p>
    </div>
  )
}

export default Home


export const getServerSideProps = async () => {
  const questions = await prisma?.pollQuestion.findMany();
  
  return {
    props: {
      questions:JSON.stringify(questions)
    }
  }
}