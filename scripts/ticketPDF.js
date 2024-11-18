
export function generateTicketPdf(placa, valor) {
    var doc = new jsPDF();
    const empresa = "Estacionameto do shoping sulista";
    const endereco = " Rua da Bruma, 102, Centro, Brasília, DF";
    const chavePix = "b558ca4e-789f-4676-a8da-b53025926c51";
    const dataVencimento = new Date();
    dataVencimento.setDate(dataVencimento.getDate() + 1);
    const dataVencimentoFormatada = dataVencimento.toLocaleDateString();

    const image = new Image();
    image.src = "QRCode/QRCode.png"

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("RECIBO DO PAGADOR", 20, 20);

    // Informações
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Beneficíario: ${empresa}`, 20, 35);
    doc.text(`Endereço: ${endereco}`, 20, 40);
    doc.text(`Chave Pix: ${chavePix}`, 20, 45);
    doc.text(`Data de Vencimento: ${dataVencimentoFormatada}`, 20, 50);
    doc.text(`Pagador: Veículo com Placa: ${placa}`, 20, 65);
    doc.text(`Valor do Pagamento: R$ ${valor.toFixed(2)}`, 20, 70);
    

    // Ticket
    doc.text("Pague utilizando o QR Code abaixo:", 20, 90);
    doc.addImage(image, "png", 20, 95, 50, 50);

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 160, 190, 160);
    doc.setFont("helvetica", "italic");
    doc.text("Corte na linha pontilhada", 20, 165);

    doc.setFont("helvetica", "bold");
    doc.text("INSTRUÇÕES PARA PAGAMENTO", 20, 180);
    doc.setFont("helvetica", "normal");
    doc.text(`Utilize o QR Code acima para realizar o pagamento. Guarde este boleto como comprovante`, 20, 190);
    doc.text(`Pagável em qualquer instituição que aceite pagamentos via Pix até ${dataVencimentoFormatada}.`, 20, 195);

    doc.save(`boleto_ticket_${placa}.pdf`);
}