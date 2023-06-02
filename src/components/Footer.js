function Footer() {
  return (
    <div
      className="FooterBackroundColor
    text-1xl text-black text-center
    fixed
    inset-x-0
    bottom-0
    p-3"
      style={{ text: "uppper" }}
    >
      &copy; {new Date().getFullYear()} Үндэсний аудитын газрын Мэдээллийн
      технологийн төв
    </div>
  );
}
export default Footer;
