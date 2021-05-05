import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Container, Button, Input, ProfilePic } from "../components/style";

export default function Home() {
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await axios.get(`http://localhost:8000/${data.user}`);
    const json = await response.data;
    setProfileData(json[0]);
    console.log(json[0]);
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Digite o usuario" {...register("user")} />
        <Button type="submit">Enviar</Button>
      </form>

      {!!loading && "Carregando..."}
      {!!profileData && (
        <Container>
          <ProfilePic src={profileData.profilePic} title={profileData.name} width="155" />
          <h1>Usuario: @{profileData.user}</h1>
          <p>Nome: {profileData.name}</p>
          <p>Biografia: {profileData.bio}</p>
          <p>Publicações: {profileData.publicacoes}</p>
          <p>Seguidores: {profileData.seguidores}</p>
          <p>Seguindo: {profileData.seguindo}</p>
          <div>
            {profileData.pics.map((item) => (
              <iframe src={item} width="650" height="645" />
            ))}
          </div>
        </Container>
      )}
    </div>
  )
}
