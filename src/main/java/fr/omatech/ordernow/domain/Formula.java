package fr.omatech.ordernow.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Formula.
 */
@Entity
@Table(name = "formula")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "label")
    private String label;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

    @OneToMany(mappedBy = "formula")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> listProducts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("listFormules")
    private Menu menu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Formula label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Formula price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Set<Product> getListProducts() {
        return listProducts;
    }

    public Formula listProducts(Set<Product> products) {
        this.listProducts = products;
        return this;
    }

    public Formula addListProduct(Product product) {
        this.listProducts.add(product);
        product.setFormula(this);
        return this;
    }

    public Formula removeListProduct(Product product) {
        this.listProducts.remove(product);
        product.setFormula(null);
        return this;
    }

    public void setListProducts(Set<Product> products) {
        this.listProducts = products;
    }

    public Menu getMenu() {
        return menu;
    }

    public Formula menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Formula)) {
            return false;
        }
        return id != null && id.equals(((Formula) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Formula{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
