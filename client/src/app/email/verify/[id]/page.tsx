import VerifyEmailForm from "@/components/auth/VerifyEmailForm"

const VerifyEmailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  return <VerifyEmailForm id={id}/>
}

export default VerifyEmailPage