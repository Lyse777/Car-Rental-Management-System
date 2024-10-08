package com.Lyse.Marius.Car.Rent.Management.System.Model;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.Lyse.Marius.Car.Rent.Management.System.Repository.RentalRepository;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Component("pdfGenerator")
public class PDFGenerator {

    @Value("${pdfDir}")
    private String pdfDir;

    @Value("${reportFileName}")
    private String reportFileName;

    @Value("${reportFileNameDateFormat}")
    private String reportFileNameDateFormat;

    @Value("${localDateFormat}")
    private String localDateFormat;

    @Value("${logoImgPath}")
    private String logoImgPath;

    @Value("${logoImgScale}")
    private Float[] logoImgScale;

    @Value("${currencySymbol:}")
    private String currencySymbol;

    @Value("${table_noOfColumns}")
    private int noOfColumns;

    @Value("${table.columnNames}")
    private List<String> columnNames;

    @Autowired
    private RentalRepository eRepo;

    private static final Font COURIER = new Font(Font.FontFamily.COURIER, 20, Font.BOLD);
    private static final Font COURIER_SMALL = new Font(Font.FontFamily.COURIER, 16, Font.BOLD);
    private static final Font COURIER_SMALL_FOOTER = new Font(Font.FontFamily.COURIER, 12, Font.BOLD);

    public void generatePdfReport() {
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, new FileOutputStream(getPdfNameWithDate()));
            document.open();
            addLogo(document);
            addDocTitle(document);
            createTable(document, noOfColumns);
            addFooter(document);
            document.close();
            System.out.println("------------------Your PDF Report is ready!-------------------------");
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        }
    }

    private void addLogo(Document document) {
        try {
            Image img = Image.getInstance(logoImgPath);
            img.scaleAbsolute(100, 50); // Adjust the width and height as needed
            img.setAlignment(Element.ALIGN_RIGHT);
            document.add(img);
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }
    }

    private void addDocTitle(Document document) throws DocumentException {
        String localDateString = LocalDateTime.now().format(DateTimeFormatter.ofPattern(localDateFormat));
        Paragraph p1 = new Paragraph();
        leaveEmptyLine(p1, 1);
        p1.add(new Paragraph(reportFileName, COURIER));
        p1.setAlignment(Element.ALIGN_CENTER);
        leaveEmptyLine(p1, 1);
        p1.add(new Paragraph("Report generated on " + localDateString, COURIER_SMALL));

        document.add(p1);
    }

    private void createTable(Document document, int noOfColumns) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        leaveEmptyLine(paragraph, 3);
        document.add(paragraph);

        PdfPTable table = new PdfPTable(noOfColumns);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        // Set column widths and padding
        float[] columnWidths = { 1f, 2f, 2f, 1.5f, 1f, 3f, 3f, 2f };
        table.setWidths(columnWidths);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        // Add column headers
        for (int i = 0; i < noOfColumns; i++) {
            PdfPCell cell = new PdfPCell(new Phrase(columnNames.get(i)));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.CYAN);
            cell.setPadding(5f); // Add padding to cells
            table.addCell(cell);
        }

        table.setHeaderRows(1);
        getDbData(table);
        document.add(table);
    }

    private void getDbData(PdfPTable table) {
        List<Rental> list = eRepo.getAllRentalData();
        for (Rental rental : list) {
            table.addCell(String.valueOf(rental.getRental_ID()));
            table.addCell(rental.getRental_start_date().toString());
            table.addCell(rental.getReturn_date().toString());
            table.addCell(String.valueOf(rental.getTotal_rental_cost()));
            table.addCell(rental.getCar().getCar_ID());
            table.addCell(rental.getCustomer().getCustomer_ID() + ", " +
                    rental.getCustomer().getFirst_name() + " " +
                    rental.getCustomer().getLast_name());
            table.addCell(rental.getEmployee().getEmployee_ID() + ", " +
                    rental.getEmployee().getFirst_name() + " " +
                    rental.getEmployee().getLast_name());
            table.addCell(rental.getPayment_status());
        }
    }

    private void addFooter(Document document) throws DocumentException {
        Paragraph p2 = new Paragraph();
        leaveEmptyLine(p2, 3);
        p2.setAlignment(Element.ALIGN_MIDDLE);
        p2.add(new Paragraph("------------------------End Of " + reportFileName + "------------------------",
                COURIER_SMALL_FOOTER));

        document.add(p2);
    }

    private static void leaveEmptyLine(Paragraph paragraph, int number) {
        for (int i = 0; i < number; i++) {
            paragraph.add(new Paragraph(" "));
        }
    }

    public String getPdfNameWithDate() {
        String localDateString = LocalDateTime.now().format(DateTimeFormatter.ofPattern(reportFileNameDateFormat));
        return pdfDir + reportFileName + "-" + localDateString + ".pdf";
    }

}